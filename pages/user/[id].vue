<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const client = useClient()

const id = route.params.id as string

const {
  data,
  pending,
  error,
  refresh,
} = await useAsyncQuery(['getUser', { id }], {
  pick: ['name', 'id'],
})

const deleteUser = async () => {
  await client.mutation('deleteUser', { id })
  router.replace('/user')
}

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div v-if="pending">
    loading...
  </div>
  <div v-else-if="error">
    not found
  </div>
  <div v-else-if="data">
    <div i-twemoji:waving-hand text-4xl inline-block animate-shake-x animate-duration-5000 />
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <ul text-xl>
      <li>
        ID: {{ data.id }}
      </li>
      <li>
        Name: {{ data.name }}
      </li>
    </ul>

    <div mt-4>
      <button btn text-sm @click="deleteUser">
        Delete
      </button>
    </div>

    <div>
      <button class="btn m-3 text-sm" @click="router.go(-1)">
        Back
      </button>
    </div>
  </div>
  <div v-else>
    Something else went wrong
  </div>
</template>
