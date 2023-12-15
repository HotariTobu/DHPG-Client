<script lang="ts" setup>
const props = defineProps<{
  func: () => Promise<void>
}>()

const processing = ref(false)

const handleClick = async () => {
  if (processing.value) {
    return
  }
  processing.value = true

  await props.func()

  processing.value = false
}

onErrorCaptured(() => {
  processing.value = false
})
</script>

<template>
  <Button
    v-bind="$attrs"
    color="primary"
    @click="handleClick"
    :disabled="processing"
    :loading="processing"
  >
    <slot />
  </Button>
</template>

<style scoped>
</style>
