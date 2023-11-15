<script lang="ts" setup>
const props = defineProps<{
  blob: Blob,
}>()

const loading = ref(true)
const src = ref('')

readAsDataURLAsync(props.blob).then(dataUrl => src.value = dataUrl)
</script>

<template>
  <div>
    <div v-if="loading">
      <slot name="placeholder">
        <v-skeleton-loader type="image" />
      </slot>
    </div>
    <v-img
      v-bind="$attrs"
      :src="src"
      @load="loading = false"
    >
      <div v-if="!loading">
        <slot />
      </div>
    </v-img>
  </div>
</template>

<style scoped>
</style>
