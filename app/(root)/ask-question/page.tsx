import { auth } from '@/auth'
import QuestionForm from '@/components/forms/QuestionForm'
import { redirect } from 'next/navigation';

const AskaQuestion = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/sign-in');
  }
  return (
    <>
    <div className='h1-bold text-dark100_light900'>AskaQuestion</div>

    <div className='mt-9'>
      <QuestionForm />
    </div>
    </>
  )
}

export default AskaQuestion