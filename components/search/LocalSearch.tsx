'use client'

import Image from 'next/image'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Assuming these utility functions are correctly defined in your project
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url'

import { Input } from '../ui/input'

interface Props {
  route: string
  imgSrc: string
  placeholder: string
  otherClasses?: string
  iconPosition?: 'left' | 'right'
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
  iconPosition = 'left',
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // 1. Get the current 'query' parameter from the URL
  const urlQuery = searchParams.get('query')

  // 2. Initialize the local state with the current URL query or an empty string
  const [searchQuery, setSearchQuery] = useState(urlQuery || '')

  useEffect(() => {
    // Set up the debounce timer
    const delayDebounceFn = setTimeout(() => {
      // Logic for when the search box HAS content
      if (searchQuery) {
        // *** FIX APPLIED HERE: Only push if the state value is different from the current URL value ***
        if (urlQuery !== searchQuery) {
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'query',
            value: searchQuery,
          })

          router.push(newUrl, { scroll: false })
        }
      }
      // Logic for when the search box is EMPTY
      else {
        // *** FIX APPLIED HERE: Only push if we are on the correct route AND the 'query' param currently exists in the URL ***
        if (pathname === route && urlQuery) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 300) // 300ms debounce delay

    // Cleanup function to clear the previous timer
    return () => clearTimeout(delayDebounceFn)

    // Include `urlQuery` in dependencies to detect when the URL changes (e.g., if a user hits the back button)
  }, [searchQuery, router, route, searchParams, pathname, urlQuery])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={15}
          height={15}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  )
}

export default LocalSearch
