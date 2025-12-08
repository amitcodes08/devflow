"use client"
import { AskQuestionSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';

const QuestionForm = () => {
    const form = useForm({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
        }
    });
  return (
    <Form {...form}>
        <form className='flex w-full flex-col gap-10'></form>
    </Form>
  )
}

export default QuestionForm