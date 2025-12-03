import Image from 'next/image'
import { auth, signOut } from '@/auth'
import ROUTES from '@/constants/routes';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();
  console.log("User session on home page:", session);
  return( 
    <>
    <form className='px-10 pt-[100px]' action={async () => {
      "use server"

      await signOut({redirectTo : ROUTES.SIGN_IN})
    }}>
      <Button type='submit'>Sign Out</Button>
    </form>
    </>
  )
  
}
