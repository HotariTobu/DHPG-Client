<script lang="ts" setup>
import { AxiosError } from 'axios';

const errorLogs = ref(new Map<number, Error>())

onErrorCaptured(error => {
  if (error instanceof Error) {
    console.error(error)

    if (error instanceof AxiosError) {
      const message = error.response?.data?.message
      if (message) {
        error = Error(message)
      }
    }

    if (error.message !== '') {
      const key = Date.now()
      errorLogs.value.set(key, error)
    }

    return false
  }
})
</script>

<template>
  <div>
    <slot />

    <v-snackbar
      color="red"
      location="bottom left"
      :model-value="true"
      timeout="-1"
      v-for="[id, error] of errorLogs"
      :key="id"
    >
      {{ error.message }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="errorLogs.delete(id)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
</style>
