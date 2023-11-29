<script lang="ts" setup>
const props = defineProps<{
  blob: Blob,
}>()

const loading = ref(true)

const key = Date.now().toString()
const { data: src, pending } = useLazyAsyncData(key, () => {
  return readAsDataURLAsync(props.blob)
}, {

})
</script>

<template>
  <v-img
    :src="src ?? ''"
    @load="loading = false"
  >
    <slot
      v-if="pending || loading"
      name="placeholder"
    >
      <v-skeleton-loader type="image" />
    </slot>
    <slot v-else />
  </v-img>
</template>

<style scoped>
</style>
