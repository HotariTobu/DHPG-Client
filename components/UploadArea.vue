<script lang="ts" setup>
import { mdiImageMultipleOutline } from '@mdi/js';

const props = withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  upload: [files: FileList]
}>()

const handleChange = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    if (event.target.files === null) {
      return
    }

    emit('upload', event.target.files)
  }
}

const handleDragover = (event: DragEvent) => {
  if (event.dataTransfer === null) {
    return
  }

  const types = event.dataTransfer.types.join()
  if (/file/i.test(types)) {
    event.dataTransfer.dropEffect = 'copy'
  }
  else {
    event.dataTransfer.dropEffect = 'none'
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer === null) {
    return
  }

  if (event.dataTransfer.files.length === 0) {
    return
  }

  emit('upload', event.dataTransfer.files)
}
</script>

<template>
  <label
    class="d-flex flex-column"
    :class="{
      'cursor-pointer': !props.disabled,
    }"
    @dragover.prevent="handleDragover"
    @drop.prevent="handleDrop"
  >
    <input
      :disabled="props.disabled"
      class="d-none"
      type="file"
      multiple
      @change="handleChange"
    >

    <slot>
      <div
        class="d-flex mx-auto w-100 border-dashed border-1"
        :style="{
          maxWidth: '300px',
          height: '200px',
        }"
      >
        <v-icon
          class="d-block ma-auto"
          size="x-large"
          :icon="mdiImageMultipleOutline"
        />
      </div>
      <div class="mt-4 text-center">
        <Button
          class="pointer-events-none"
          variant="outlined"
          :text="props.label"
        />
        <div class="mt-2">
          JPG / JPEG / PNG<br>
          <!-- You can upload to 32MB per file and a maximum of 200files<br>
          (the total file size must be less than 200 MB)<br> -->
        </div>
      </div>
    </slot>
  </label>
</template>
