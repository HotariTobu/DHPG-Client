<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const show = ref(false)

const value = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <v-text-field
    v-bind="$attrs"
    v-model="value"
    :type="show ? 'text' : 'password'"
    :append-inner-icon="show ? mdiEye : mdiEyeOff"
    @click:append-inner="show = !show"
  />
</template>

<style scoped>
</style>
