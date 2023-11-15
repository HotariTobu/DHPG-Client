<script lang="ts" setup>
const errorLogs = ref(new Map<number, Error>())

onErrorCaptured(error => {
  if (error instanceof Error) {
    if (error.message !== '') {
      console.error(error)
      errorLogs.value.set(Date.now(), error)
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
