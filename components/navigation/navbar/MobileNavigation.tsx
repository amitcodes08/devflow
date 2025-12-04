import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ROUTES from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import NavLinks from './NavLinks'

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 border-none">
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1 mb-8">
          <Image
            src="/icons/site-logo.svg"
            alt="DevFlow Logo"
            width={23}
            height={23}
            className="object-contain"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-4 w-full">
             <NavLinks isMobileNav/>
            </section>
          </SheetClose>

          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 px-4 pb-4">
            <SheetClose asChild>
              <Link
                href={ROUTES.SIGN_IN}
                className="body-medium text-dark300_light700 hover:text-dark400_light800"
              >
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href={ROUTES.SIGN_UP}
                className="body-medium text-dark300_light700 hover:text-dark400_light800"
              >
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign Up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation
