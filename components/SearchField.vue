<script setup lang="ts">
import { mdiMagnify } from '@mdi/js'

const props = withDefaults(defineProps<{
  defaultParam?: string
}>(), {
  defaultParam: '',
})

const emit = defineEmits<{
  search: [param: string],
}>()

const searchParam = ref<string | null>(props.defaultParam)

const search = () => {
  const param = searchParam.value
  if (param === null || param === '') {
    return
  }

  emit(`search`, param)
}
</script>

<template>
  <v-text-field
    v-model="searchParam"
    placeholder="Search here..."
    @click:append-inner="search"
    @keyup.enter="search"
    :append-inner-icon="mdiMagnify"
    variant="underlined"
    density="compact"
    single-line
    hide-details
    clearable
  />
</template>
