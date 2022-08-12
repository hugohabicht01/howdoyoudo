// import type { inferAsyncReturnType } from '@trpc/server'
import * as trpc from '@trpc/server'
import { z } from 'zod'
import { userDB } from '~/utils/users'

export const router = trpc.router()
  .query('getUsers', {
    async resolve() {
      return userDB.users
    },
  })
  .query('getUser', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input
      return userDB.getUser(id)
    },
  })
  .mutation('createUser', {
    // validate input with Zod
    input: z.object({ name: z.string().min(1) }),
    async resolve({ input }) {
      // use your ORM of choice
      const { name } = input
      console.log(`creating new user with name ${name}`)
      return userDB.addUser({ name, id: Date.now().toString() })
    },
  })
  .mutation('deleteUser', {
    // validate input with Zod
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      // use your ORM of choice
      const { id } = input
      return userDB.deleteUser(id)
    },
  })
