import ROUTES from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TagCard from '../cards/TagCard'

const RightSideBar = () => {

    const topQuestions = [
    {_id: "1", title: 'How to implement authentication in a React app?'},
    {_id: "2", title: 'What is the difference between React and Angular?'},
    {_id: "3", title: 'How to manage state in large React applications?'},
    {_id: "4", title: 'What are React hooks and how to use them?'},
    {_id: "5", title: 'How to optimize performance in React apps?'},
    ]

    const popularTags = [
        {_id: "1", name: "react", questions: 100},
        {_id: "2", name: "javascript", questions: 200},
        {_id: "3", name: "typescript", questions: 150},
        {_id: "4", name: "nextjs", questions: 50},
        {_id: "5", name: "react-query", questions: 75},

    ]

  return (
    <section className='pt-28 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6  overflow-y-auto border-l px-6 py-4 shadow-light-300 dark:shadown-none max-lg:hidden'>
        <div>

        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
            {topQuestions.map(({_id, title}) => (
                <Link key={_id} href={ROUTES.PROFILE(_id)} className='cursor-pointer flex items-center justify-between gap-6'>
                    <p className='body-medium text-dark500_light700'>{title}</p>
                    <Image src="/icons/chevron-right.svg" alt='chevron' width={20} height={20} />
                </Link>
            ))}
        </div>
        </div>

        <div className='mt-8'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
            <div className='mt-7 flex flex-col gap-2'>
                {popularTags.map(({_id, name, questions}) => (
                    <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
                ))}
            </div>
        </div>
    </section>
  )
}

export default RightSideBar