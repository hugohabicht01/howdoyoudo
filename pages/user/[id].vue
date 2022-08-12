<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const client = useClient()

const id = route.params.id
if (typeof id !== 'string')
  router.replace('/notfound') // FIXME: This doesn't seem to be working

const user = await client.query('getUser', { id })
if (typeof user === 'undefined')
  router.replace('/notfound')

const deleteUser = async () => {
  await client.mutation('deleteUser', { id })
  await new Promise(resolve => setTimeout(resolve, 100))
  router.go(-1)
}

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <div i-twemoji:waving-hand text-4xl inline-block animate-shake-x animate-duration-5000 />
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <div text-xl>
      {{ user.name }}!
    </div>

    <div>
      <button @click="deleteUser">
        Delete
      </button>
    </div>

    <div>
      <button class="btn m-3 text-sm" @click="router.go(-1)">
        Back
      </button>
    </div>
  </div>
</template>
