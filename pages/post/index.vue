<script lang="ts" setup>
import type Post from '@/schemas/post'

const axios = useAxios()
const router = useRouter()
// const user = useUser(true)
const user = useUser()

const state = reactive({
  title: '',
  description: '',
})

const imgs = ref(new Map<number, Blob>())

let nextId = 0

const handleUpload = async (files: FileList) => {
  for (const file of files) {
    if (isImage(file)) {
      imgs.value.set(nextId++, file)
    }
  }
}

const post = async () => {
  if (user.value === null) {
    throw new Error('User was null')
  }

  if (imgs.value.size === 0) {
    return
  }

  const res = await axios.post<Post>('/post', {
    ...state,
    userId: user.value.userId,
    content: imgs.value.values().next().value
  })

  if (res.status === 201) {
    router.replace(`/post/${res.data.postId}`)
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <div>
    <div class="mx-4 d-flex flex-column">
      <div>
        <BlobImage
          class="mt-4"
          v-for="[id, img] of imgs"
          :key="id"
          :blob="img"
        >
          <v-btn>text</v-btn>
        </BlobImage>
        <UploadArea
          class="mt-4"
          @upload="handleUpload"
        />
      </div>
      <v-form class="mt-4">
        <v-text-field
          label="title"
          v-model="state.title"
          required
      />
      <v-textarea
        label="description"
        v-model="state.description"
      />
      <ProcessButton :func="post">Post</ProcessButton>
    </v-form>
  </div>
</div></template>

<style scoped>
</style>
