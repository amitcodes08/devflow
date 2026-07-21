"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'
import { SheetClose } from '@/components/ui/sheet';

const NavLinks = ({isMobileNav = false, userId}: {isMobileNav?:Boolean, userId?: string}) => {

    const pathName = usePathname();
    
  return (
    <>
    {sidebarLinks.map((item) => {
        // Compute a local resolved route — never mutate the shared sidebarLinks array
        const resolvedRoute =
          item.route === '/profile'
            ? userId
              ? `/profile/${userId}`
              : '/sign-in'
            : item.route;

        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        const LinkComponent = (<Link href={resolvedRoute} key={item.label} className={cn(isActive ? 'primary-gradient rounded-lg text-light-900': 'text-dark300_light900', 'flex justify-start gap-4 bg-transparent p-4')}>
            <Image src={item.imgURL} alt={item.label} width={20} height={20} className={cn({"invert-colors": !isActive})}/>
            <p className={cn(isActive ? "base-bold": "base-medium", !isMobileNav && 'max-lg:hidden')}>{item.label}</p>
        </Link>)

        return isMobileNav ? <SheetClose asChild key={item.label}>{LinkComponent}</SheetClose> : <React.Fragment key={item.label}>{LinkComponent}</React.Fragment>;
    })}
    </>
  )
}

export default NavLinks