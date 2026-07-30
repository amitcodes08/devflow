import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { IAccountDoc } from './database/account.model'
import { IUserDoc } from './database/user.model'
import { api } from './lib/api'
import { SignInSchema } from './lib/validations'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHub,
    Google, 
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const { data: existingAccount } = (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>

          if (!existingAccount) return null

          const { data: existingUser } = (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDoc>

          if (!existingUser) return null

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          )

          if (isValidPassword) {
            return {
              id: existingUser._id?.toString(),
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === 'credentials'
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>

        if (!success || !existingAccount) return token

        const userId = existingAccount.userId

        if (userId) token.sub = userId.toString()
      }

      return token
    },
    async signIn({ user, profile, account }) {
      if (account?.type === 'credentials') return true
      if (!account || !user) return false

      const name =
        user.name ||
        (profile?.name as string) ||
        (profile?.login as string) ||
        user.email?.split('@')[0] ||
        'User'

      const rawUsername =
        account.provider === 'github'
          ? (profile?.login as string) || name
          : name

      const cleanUsername = rawUsername
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_]/g, '')

      const username =
        cleanUsername.length < 3 ? `${cleanUsername}user` : cleanUsername

      const userInfo = {
        name,
        email: user.email!,
        image: user.image || '',
        username,
      }

      try {
        const { success } = (await api.auth.oAuthSignIn({
          user: userInfo,
          provider: account.provider as 'github' | 'google',
          providerAccountId: account.providerAccountId,
        })) as ActionResponse

        if (!success) {
          console.error('oAuthSignIn API returned failure for:', userInfo)
          return false
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
  },
})
