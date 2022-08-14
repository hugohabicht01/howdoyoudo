<script setup lang="ts">
const router = useRouter()
const client = useClient() // auto-imported

const users = await client.query('getUsers')

const newUserName = useState('newUserName', () => (''))
const createUser = async () => {
  const { id } = await client.mutation('createUser', {
    name: newUserName.value,
  })
  newUserName.value = ''
  router.push(`/user/${encodeURIComponent(id)}`)
}
definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div class="w-4/10 m-auto">
    <div i-twemoji:waving-hand text-4xl inline-block animate-shake-x animate-duration-5000 />
    <h3 text-2xl font-500>
      Userlist
    </h3>
    <div text-xl>
      <ol class="list-decimal">
        <li v-for="user in users" :key="user.id" flex items-start>
          <RouterLink :to="`/user/${encodeURIComponent(user.id)}`">
            {{ user.name }}
          </RouterLink>
        </li>
      </ol>
    </div>

    <div mt-4>
      <h3 text-xl>
        Create new user
      </h3>
      <form @submit.prevent="createUser">
        <input v-model="newUserName" rounded type="text" text-black pt-1 pb-1>
        <input btn ml-1 type="submit">
      </form>
    </div>
    <div mt-10>
      <button class="btn m-3 text-sm" @click="router.go(-1)">
        Back
      </button>
    </div>
  </div>
</template>
