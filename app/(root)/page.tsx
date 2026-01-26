import { auth } from '@/auth'
import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilter from '@/components/filters/HomeFilter'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import handleError from '@/lib/handlers/error'
import dbConnect from '@/lib/mongoose'
import Link from 'next/link'


const Questions = [
  {
    _id: '1',
    title: 'How to learn React?',
    content: 'I want to learn React, can anyone help me?',
    tags: [
      {
        _id: '1',
        name: 'React',
      },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s',
    },
    upvotes: 10,
    downvotes: 2,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'What is TypeScript?',
    content: 'Can someone explain TypeScript and its benefits?',
    tags: [
      {
        _id: '3',
        name: 'TypeScript',
      },
      { _id: '4', name: 'Web Development' },
    ],
    author: { 
      _id: '2', 
      name: 'Jane Smith',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s'
    },
    upvotes: 15,
    downvotes: 1,
    answers: 8,
    views: 150,
    createdAt: new Date(),
  },
  {
    _id: '3',
    title: 'How to use Next.js?',
    content: "I'm new to Next.js, where should I start?",
    tags: [
      {
        _id: '5',
        name: 'Next.js',
      },
      { _id: '1', name: 'React' },
    ],
    author: { 
      _id: '3', 
      name: 'Mike Johnson',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s'
    },
    upvotes: 20,
    downvotes: 3,
    answers: 12,
    views: 200,
    createdAt: new Date(),
  },
  {
    _id: '4',
    title: 'Best practices for REST APIs',
    content: 'What are the best practices when building REST APIs?',
    tags: [
      {
        _id: '6',
        name: 'API',
      },
      { _id: '7', name: 'Backend' },
    ],
    author: { 
      _id: '4', 
      name: 'Sarah Williams',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s'
    },
    upvotes: 25,
    downvotes: 2,
    answers: 10,
    views: 250,
    createdAt: new Date(),
  },
  {
    _id: '5',
    title: 'How to optimize database queries?',
    content: 'My queries are running slow, how can I optimize them?',
    tags: [
      {
        _id: '8',
        name: 'Database',
      },
      { _id: '7', name: 'Performance' },
    ],
    author: { 
      _id: '5', 
      name: 'David Brown',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s'
    },
    upvotes: 18,
    downvotes: 1,
    answers: 9,
    views: 180,
    createdAt: new Date(),
  },
]

const test = async () => {
  try {
   await dbConnect();
  } catch (error) {
    handleError(error);
  }
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function Home({ searchParams }: SearchParams) {
  const result = await test();
  
  const { query = '', filter = '' } = await searchParams

  const filteredQuestions = Questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query?.toLowerCase())
    const matchesFilter = filter ? question.tags[0].name.toLowerCase() == filter.toLowerCase() : true;

    return matchesFilter && matchesQuery
  })

  const session = await auth()

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className="mt-4">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="flex-1"
        />
        <HomeFilter />
        <div className="mt-10 flex w-full flex-col gap-6">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question._id} question={question}/>
          ))}
        </div>
      </section>
    </>
  )
}
