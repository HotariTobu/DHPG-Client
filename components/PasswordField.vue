<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  value?: string
  label?: string
  hint?: string
}>()

const emits = defineEmits<{
  input: [value: string]
}>()

const show = ref(false)
</script>

<template>
  <v-text-field
  :value="props.value"
  @input="emits.input($event)"

  :label="props.label"
  :hint="props.hint"

  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
  @click:append-inner="show = !show"
  />
</template>

<style scoped></style>
