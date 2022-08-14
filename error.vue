<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <h1>Errors</h1>
  <pre>
    {{ props.error }}
  </pre>
  <button @click="handleError">
    Clear errors
  </button>
</template>

<!--
<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div>Not found</div>
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>

-->
