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
  <div class="my-auto pa-2">
    <v-card
      class="mx-auto px-4 px-sm-10 py-10"
      color="secondary"
      :max-width="400"
    >
      <Text class="mb-16 text-h2 text-center text-logo">
        login
      </Text>
      <v-form class="w-100">
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
  </div>
</template>

<style scoped>
</style>
