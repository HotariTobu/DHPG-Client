<script lang="ts" setup>
import { mdiAccount } from "@mdi/js";
import type User from '~/schemas/user';

interface UserResponse {
  totalPageCount: number,
  users: User[],
}

const { page, pageOffset } = usePagination()

const props = defineProps<{
  searchParam?: string,
}>()

const config = {
  params: {
    pageOffset,
    ...props
  }
}
</script>

<template>
  <DataProvider
    url="/user"
    :config="config"
    :dummy="({} as UserResponse)"
  >
    <template #pending>
      <v-list>
        <v-skeleton-loader
          type="list-item-avatar"
          v-for="i in 12"
          :key="i"
        />
      </v-list>
    </template>
    <template #default="{ data }">
      <v-list>
        <v-list-item
          v-for="user of data.users"
          :key="user.userId"
          :title="user.name"
          :to="`/user/${user.userId}`"
        >
          <template #prepend>
            <v-avatar
              :image="user.icon"
              :icon="mdiAccount"
            />
          </template>
        </v-list-item>
      </v-list>
      <ClientOnly>
        <v-pagination
          :length="data.totalPageCount"
          v-model="page"
        />
      </ClientOnly>
    </template>
  </DataProvider>
</template>

<style scoped>
</style>
~/schemas/thumbnail
