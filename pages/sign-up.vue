<script lang="ts" setup>
const state = reactive({
  name: '',
  email: '',
  password: '',
})
</script>

<template>
  <div>
    <v-card class="mt-4 mx-auto pa-4" :max-width="400">
      <v-form>
        <v-text-field label="Name" required />
        <v-text-field label="Email" required />
        <PasswordField v-model="state.password" />
        <v-btn color="primary">Sign Up</v-btn>
        <v-btn color="secondary">Sign Up</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
</style>
