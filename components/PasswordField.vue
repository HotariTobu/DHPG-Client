<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  hint?: string
  required: boolean
}>(), {
  required: false
})

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
  v-model="value"

  :label="props.label"
  :hint="props.hint"
  :required="props.required"

  :type="show ? 'text' : 'password'"
  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
  @click:append-inner="show = !show"
  />
</template>

<style scoped></style>
