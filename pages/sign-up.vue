<script lang="ts" setup>
import type User from '~/schemas/user';

definePageMeta({
  layout: false,
})

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

    if (window.history.state.back === null) {
      router.replace('/')
    }
    else {
      router.back()
    }
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <div class="my-auto pa-2">
    <v-card
      class="mx-auto px-2 px-sm-10 py-10 text-text"
      color="secondary"
      :max-width="400"
    >
      <div class="mb-12 text-h2 text-center text-logo select-none">
        iSign
      </div>
      <v-form>
        <FormField
          v-model="state.name"
          label="Name"
          required
        />
        <FormField
          v-model="state.email"
          label="Email"
          type="email"
          required
        />
        <PasswordField
          v-model="state.password"
          label="Password"
          required
        />
        <ProcessButton
          class="d-block mx-auto"
          :func="signUp"
        >Sign Up</ProcessButton>
        <div class="d-flex mx-auto mt-2 w-fit">
          Already have an account?
          <NuxtLink
            class="ms-2"
            to="/login"
            replace
          >Login</NuxtLink>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
</style>
