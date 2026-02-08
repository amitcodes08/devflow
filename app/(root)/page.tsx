import { auth } from '@/auth'
import QuestionCard from '@/components/cards/QuestionCard'
import DataRenderer from '@/components/DataRenderer'
import CommonFilter from '@/components/filters/CommonFilter'
import HomeFilter from '@/components/filters/HomeFilter'
import Pagination from '@/components/Pagination'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import ROUTES from '@/constants/routes'
import { EMPTY_QUESTION } from '@/constants/states'
import { getQuestions } from '@/lib/actions/question.action'
import handleError from '@/lib/handlers/error'
import dbConnect from '@/lib/mongoose'
import Link from 'next/link'

const test = async () => {
  try {
    await dbConnect()
  } catch (error) {
    handleError(error)
  }
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function Home({ searchParams }: SearchParams) {
  const result = await test()

  const { page, pageSize, query, filter } = await searchParams

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || '',
    filter: filter || '',
  })

  const { questions, isNext } = data || {}

  // const filteredQuestions = Questions.filter((question) => {
  //   const matchesQuery = question.title.toLowerCase().includes(query?.toLowerCase())
  //   const matchesFilter = filter ? question.tags[0].name.toLowerCase() == filter.toLowerCase() : true;

  //   return matchesFilter && matchesQuery
  // })

  const session = await auth()

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className="mt-4 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      
      <HomeFilter />

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </>
  )
}
