<script lang="ts" setup>
import { mdiCheck, mdiPencil } from '@mdi/js';
import type User from '~/schemas/user';

const axios = useAxios()
const userId = useId()
const loggedInUser = useUser()

const editing = ref(false)

const getIcon = (files: FileList) => {
  let img: Blob | null = null

  for (const file of files) {
    if (isImage(file)) {
      img = file
      break
    }
  }

  if (img === null) {
    return
  }

  return readAsDataURLAsync(img)
}

const applyUpdate = async (user: User) => {
  const res = await axios.put(`/user/${userId}`, toRaw(user))

  if (res.status === 200) {
    loggedInUser.value = user
    editing.value = false
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <div>
    <DataProvider
      class="ma-8"
      :url="`/user/${userId}`"
      :dummy="({} as User)"
    >
      <template #="{ data: user }">
        <div>
          <div class="d-flex align-center">
            <v-skeleton-loader
              v-if="user === null"
              type="avatar"
            />
            <UploadArea
              v-else
              :disabled="!editing"
              @upload="async (files) => user.icon = await getIcon(files)"
            >
              <v-avatar
                class="elevation-2"
                size="x-large"
                :image="user.icon"
              />
            </UploadArea>
            <div class="mx-2"></div>
            <v-skeleton-loader
              v-if="user === null"
              type="text"
            />
            <input
              v-else
              class="text-h6 text-sm-h5 text-md-h4"
              placeholder="Name"
              :readonly="!editing"
              v-model="user.name"
            >
            <v-spacer />
            <div v-if="user && userId === loggedInUser?.userId">
              <v-icon
                v-if="editing"
                :icon="mdiCheck"
                @click="() => applyUpdate(user)"
              />
              <v-icon
                v-else
                :icon="mdiPencil"
                @click="editing = true"
              />
            </div>
          </div>
          <v-skeleton-loader
            v-if="user === null"
            type="sentences"
          />
          <div
            v-else
            class="mt-2"
          >
            <div class="text-disabled">Joined at {{ user.createdAt.toLocaleDateString() }}</div>
            <textarea
              rows="3"
              placeholder="Description"
              :readonly="!editing"
              v-model="user.description"
            />
          </div>
        </div>
      </template>
    </DataProvider>

    <v-divider class="mx-2" />
    <Posts :user-id="userId" />
  </div>
</template>

<style scoped>
input,
textarea {
  width: 100%;
  outline: none;
  color: inherit;
  resize: none;
}
</style>
