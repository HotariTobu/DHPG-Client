<script lang="ts" setup>
import type User from '~/schemas/user';

const axios = useAxios()
const router = useRouter()
const user = useUser()

const state = reactive({
  name: '',
  email: '',
  password: '',
})

const signUp = async () => {
  const res = await axios.post<User>('/sign-up', toRaw(state))

  if (res.status === 201) {
    user.value = res.data
    router.replace('/')
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <div>
    <v-card
      class="mt-4 mx-auto pa-4"
      :max-width="400"
    >
      <v-form>
        <v-text-field
          v-model="state.name"
          label="Name"
          required
        />
        <v-text-field
          v-model="state.email"
          label="Email"
          required
        />
        <PasswordField
          v-model="state.password"
          label="Password"
          required
        />
        <div class="d-flex justify-space-between align-end">
          <ProcessButton :func="signUp">Sign Up</ProcessButton>
          <NuxtLink to="/login">Already sign-up?</NuxtLink>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
</style>
