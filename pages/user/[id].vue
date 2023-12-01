<script lang="ts" setup>
import type User from '~/schemas/user';

const userId = useId()
</script>

<template>
  <div>
    <DataProvider
      :url="`/user/${userId}`"
      :dummy="({} as User)"
    >
      <template #pending>
        <div>
          <v-skeleton-loader type="avatar" />
          <div class="text-h6 text-md-h5 text-lg-h4">
            <v-skeleton-loader type="text" />
          </div>
          <div>
            <v-skeleton-loader type="sentences" />
          </div>
        </div>
      </template>
      <template #default="{ data: user }">
        <div>
          <v-avatar :image="user.icon" />
          <div class="text-h6 text-md-h5 text-lg-h4">{{ user.name }}</div>
          <div class="text-gray">Joined at {{ user.createdAt.toLocaleDateString() }}</div>
          <div>{{ user.description }}</div>
        </div>
      </template>
    </DataProvider>

    <Posts :user-id="userId" />
  </div>
</template>

<style scoped>
</style>
