<script lang="ts" setup>
import type Post from '@/schemas/post'
import { useTheme } from 'vuetify/lib/framework.mjs';

const axios = useAxios()
const router = useRouter()
const user = useUser(true)

const state = reactive({
  title: '',
  description: '',
})

const imgs = ref(new Map<number, Blob>())

let nextId = 0

const handleUpload = (files: FileList) => {
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

  const blobs = Array.from(imgs.value.values())
  const contents = await Promise.all(blobs.map(readAsDataURLAsync))

  const res = await axios.post<Post>('/post', {
    userId: user.value.userId,
    ...toRaw(state),
    contents,
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
  <v-sheet
    class="d-flex flex-column"
    color="secondary"
  >
    <div class="mx-4">
      <BlobImage
        class="mx-auto mt-4"
        v-for="[id, img] of imgs"
        :key="id"
        :blob="img"
        :maxWidth="600"
      >
        <!-- <v-btn>text</v-btn> -->
      </BlobImage>
    </div>
    <UploadArea @upload="handleUpload">
      <div class="my-10 text-center">
        <v-btn
          class="pointer-events-none"
          color="accent"
          width="300"
        >
          <Text
            color="secondary"
            class="normal-case"
          >
            Add images
          </Text>
        </v-btn>
        <Text class="mt-4">
          JPG / JPEG / PNG / BMP<br>
          <!-- You can upload to 32MB per file and a maximum of 200files<br>
          (the total file size must be less than 200 MB)<br> -->
        </Text>
      </div>
    </UploadArea>
  </v-sheet>
  <div class="px-2">
    <v-sheet
      class="mx-auto mt-4"
      :max-width="600"
    >
      <v-text-field
      color="primary"
      label="Title"
      v-model="state.title"
      required
      />
      <v-textarea
      color="primary"
        label="Description"
        v-model="state.description"
      />
      <ProcessButton
        color="accent"
        class="d-block mx-auto"
        :width="200"
        :func="post"
      >
        <Text color="secondary">post</Text>
      </ProcessButton>
    </v-sheet>
  </div>
</template>

<style scoped>
.field::placeholder {
  color: inherit;
}
</style>
