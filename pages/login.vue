<script lang="ts" setup>
definePageMeta({
  layout: false,
})

const axios = useAxios()
const router = useRouter()
const user = useUser()

const state = reactive({
  email: '',
  password: '',
})

const login = async () => {
  const res = await axios.post<typeof user.value>('/login', toRaw(state))

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
  <v-card
    class="mx-2 mx-sm-auto my-auto px-4 px-sm-10 py-10"
    color="secondary"
    :min-width="400"
  >
    <div class="mb-16 text-h2 text-center text-logo">
      login
    </div>
    <v-form>
      <v-text-field
        bg-color="white"
        v-model="state.email"
        label="Email"
        required
      />
      <PasswordField
        bg-color="white"
        v-model="state.password"
        label="Password"
        required
      />
      <ProcessButton
        class="d-block mx-auto my-12"
        width="200"
        height="50"
        :func="login"
      >Login</ProcessButton>
    </v-form>
  </v-card>
</template>

<style scoped>
</style>
