import Image from 'next/image'
import Link from 'next/link'

import { getTechJobs, type Job } from '@/lib/actions/jobs.action'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSalary(job: Job): string | null {
  if (!job.job_min_salary && !job.job_max_salary) return null
  const currency = job.job_salary_currency ?? 'USD'
  const period = job.job_salary_period
    ? ` / ${job.job_salary_period.toLowerCase()}`
    : ''
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n)

  if (job.job_min_salary && job.job_max_salary)
    return `${fmt(job.job_min_salary)} – ${fmt(job.job_max_salary)}${period}`
  if (job.job_min_salary) return `From ${fmt(job.job_min_salary)}${period}`
  if (job.job_max_salary) return `Up to ${fmt(job.job_max_salary)}${period}`
  return null
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Recently'
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

function locationLabel(job: Job): string {
  if (job.job_is_remote) return 'Remote'
  const parts = [job.job_city, job.job_country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'Location N/A'
}

function employmentBadgeColor(type: string): string {
  const t = type?.toLowerCase() ?? ''
  if (t.includes('full')) return 'bg-primary-100 text-primary-500'
  if (t.includes('part')) return 'background-light700_dark400 text-dark400_light700'
  if (t.includes('contract')) return 'bg-light-700 dark:bg-dark-400 text-dark400_light700'
  return 'background-light700_dark400 text-dark400_light700'
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EmployerLogo({ logo, name }: { logo: string | null; name: string }) {
  if (logo) {
    return (
      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl light-border border">
        <Image src={logo} alt={name} fill className="object-contain p-1" />
      </div>
    )
  }
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl light-border border background-light700_dark400">
      <span className="base-semibold text-dark400_light700 uppercase">
        {name.charAt(0)}
      </span>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job)

  return (
    <article className="card-wrapper group flex flex-col gap-4 rounded-[10px] p-6 transition-shadow duration-300 hover:shadow-light-100 dark:hover:shadow-dark-100">
      {/* Header row */}
      <div className="flex items-start gap-4">
        <EmployerLogo logo={job.employer_logo} name={job.employer_name} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="base-semibold text-dark200_light900 line-clamp-1">
              {job.job_title}
            </h3>
            <span
              className={`subtle-medium rounded-full px-2.5 py-1 font-semibold uppercase tracking-wider ${employmentBadgeColor(job.job_employment_type)}`}
            >
              {job.job_employment_type ?? 'N/A'}
            </span>
          </div>

          <p className="body-regular text-dark400_light700 mt-0.5 line-clamp-1">
            {job.employer_name}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="body-regular text-dark500_light700 line-clamp-3">
        {job.job_description}
      </p>

      {/* Footer row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Metadata chips */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Location */}
          <span className="flex items-center gap-1.5">
            <Image
              src="/icons/location.svg"
              alt="location"
              width={14}
              height={14}
              className="invert-colors"
            />
            <span className="small-regular text-dark400_light700">
              {locationLabel(job)}
            </span>
          </span>

          {/* Posted date */}
          <span className="flex items-center gap-1.5">
            <Image
              src="/icons/clock.svg"
              alt="posted"
              width={14}
              height={14}
              className="invert-colors"
            />
            <span className="small-regular text-dark400_light700">
              {timeAgo(job.job_posted_at_datetime_utc)}
            </span>
          </span>

          {/* Salary */}
          {salary && (
            <span className="small-medium text-primary-500">{salary}</span>
          )}
        </div>

        {/* Apply CTA */}
        <Link
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-gradient flex items-center gap-1.5 rounded-lg px-4 py-2 text-light-900 small-medium transition-opacity hover:opacity-90"
        >
          Apply
          <Image
            src="/icons/link.svg"
            alt="open"
            width={14}
            height={14}
            className="brightness-200"
          />
        </Link>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="card-wrapper mt-10 flex flex-col items-center gap-4 rounded-[10px] p-12 text-center">
      <Image
        src="/icons/question.svg"
        alt="no jobs"
        width={48}
        height={48}
        className="invert-colors opacity-40"
      />
      <p className="h3-bold text-dark200_light900">No Jobs Found</p>
      <p className="body-regular text-dark400_light700 max-w-sm">
        We couldn&apos;t fetch tech jobs right now. Please try again later.
      </p>
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mt-6 rounded-[10px] border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 px-5 py-4">
      <p className="body-regular text-red-600 dark:text-red-400">{message}</p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

const QUERIES = [
  'software developer jobs',
  'frontend developer jobs',
  'backend engineer jobs',
  'fullstack developer jobs',
  'react developer jobs',
  'nextjs developer jobs',
  'typescript developer jobs',
]

export default async function JobsPage() {
  const query =
    QUERIES[Math.floor(Math.random() * QUERIES.length)]

  const { jobs, error } = await getTechJobs(query)

  return (
    <div className="w-full">
      {/* Page header */}
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="h1-bold text-dark100_light900">Find Jobs</h1>
          <p className="body-regular text-dark500_light700 mt-1">
            Curated tech roles powered by JSearch
          </p>
        </div>

        <span className="subtle-medium background-light700_dark400 text-dark400_light700 self-start rounded-full px-3 py-1.5 sm:self-auto">
          {jobs.length > 0 ? `${jobs.length} roles found` : 'Searching…'}
        </span>
      </section>

      {/* Optional error banner */}
      {error && <ErrorBanner message={error} />}

      {/* Grid */}
      {jobs.length === 0 && !error ? (
        <EmptyState />
      ) : (
        <div className="mt-9 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}