'use server'

export interface Job {
  job_id: string
  job_title: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_employment_type: string
  job_apply_link: string
  job_description: string
  job_city: string | null
  job_country: string | null
  job_posted_at_datetime_utc: string | null
  job_salary_currency: string | null
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_period: string | null
  job_is_remote: boolean
}

interface JSearchResponse {
  status: string
  data: {
    jobs: Job[]
  }
}

export async function getTechJobs(query = 'software developer jobs'): Promise<{
  jobs: Job[]
  error?: string
}> {
  const apiKey = process.env.JSEARCH_API_KEY

  if (!apiKey) {
    return { jobs: [], error: 'JSearch API key is not configured.' }
  }

  try {
    const url = new URL('https://api.openwebninja.com/jsearch/search-v2')
    url.searchParams.set('query', query)
    url.searchParams.set('num_pages', '1')

    const response = await fetch(url.toString(), {
      headers: { 'X-API-Key': apiKey },
      next: { revalidate: 10800 },
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const json: JSearchResponse = await response.json()

    return { jobs: json?.data?.jobs ?? [] }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch jobs'
    return { jobs: [], error: message }
  }
}
