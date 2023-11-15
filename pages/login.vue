<script lang="ts" setup>
const axios = useAxios()
const router = useRouter()
const user = useUser()

const state = reactive({
  email: '',
  password: '',
})

const login = async () => {
  const res = await axios.post<typeof user.value>('/login', state)

  if (res.status === 200) {
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
          <ProcessButton :func="login">Login</ProcessButton>
          <NuxtLink to="/sign-up">Never sign-up?</NuxtLink>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
</style>
