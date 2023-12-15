<script lang="ts" setup>
import type User from '~/schemas/user';

const axios = useAxios()

const status = ref<'none' | 'processing' | 'owned' | 'not-owned'>('none')
const image = ref<string | null>(null)
const user = ref<User | null>(null)

const verify = async (data: string) => {
  const res = await axios.post<User>('/verify', {
    data,
  })

  if (res.status === 200) {
    status.value = 'owned'
    user.value = res.data
  }
  else if (res.status === 204) {
    status.value = 'not-owned'
  }
  else {
    throwResponseError(res)
  }
}

const handleUpload = async (files: FileList) => {
  if (files.length === 0) {
    return
  }

  status.value = 'processing'

  const data = await readAsDataURLAsync(files[0])
  image.value = data

  await verify(data)
}

onErrorCaptured(() => {
  status.value = 'none'
})
</script>

<template>
  <div class="mt-4 mx-2">
    <v-card
      class="mx-auto pa-4"
      color="secondary"
      maxWidth="500"
      :loading="status === 'processing'"
    >
      <v-alert
        v-if="status === 'owned'"
        type="info"
      >
        The image is owned
        <span v-if="user !== null">
          by
          <NuxtLink :to="`/user/${user.userId}`">{{ user.name }}</NuxtLink>
        </span>
        .
      </v-alert>

      <v-alert
        v-if="status === 'not-owned'"
        type="info"
      >
        The image is owned by no one on this site.
      </v-alert>

      <VImg
        v-if="image !== null"
        class="mt-4"
        :src="image"
      />

      <UploadArea
        class="mt-4"
        label="verify image"
        @upload="handleUpload"
      />
    </v-card>
  </div>
</template>

<style scoped>
</style>
