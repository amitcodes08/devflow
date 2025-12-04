
import { auth } from '@/auth'


export default async function Home() {
  const session = await auth();
  console.log("User session on home page:", session);
  return( 
    <div>Welcome to DevFlow!</div>
  )
  
}
