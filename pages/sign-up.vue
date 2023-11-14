<script lang="ts" setup>
const axios = useAxios()
const router = useRouter()
const user = useUser()

const state = reactive({
  name: '',
  email: '',
  password: '',
})

const processing = ref(false)

const signUp = async () => {
  if (processing.value) {
    return
  }
  processing.value = true

  const res = await axios.post<typeof user.value>('/user', state)

  if (res.status === 201) {
    user.value = res.data
    router.replace('/')
  }
  else {
    throwResponseError(res)
  }

  processing.value = false
}

onErrorCaptured(() => {
  processing.value = false
})
</script>

<template>
  <div>
    <v-card class="mt-4 mx-auto pa-4" :max-width="400">
      <v-form>
        <v-text-field v-model="state.name" label="Name" required />
        <v-text-field v-model="state.email" label="Email" required />
        <PasswordField v-model="state.password" label="Password" required />
        <v-btn color="primary" @click="signUp" :disabled="processing" :loading="processing">Sign Up</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
</style>
