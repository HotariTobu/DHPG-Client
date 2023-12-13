<script lang="ts" setup>
import type User from '~/schemas/user';

const userId = useId()
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
          <div class="d-flex">
            <v-skeleton-loader
              v-if="user === null"
              type="avatar"
            />
            <v-avatar
              v-else
              size="x-large"
              :image="user.icon"
            />
            <v-skeleton-loader
              v-if="user === null"
              type="text"
            />
            <Text
              v-else
              class="text-h6 text-md-h5 text-lg-h4"
            >{{ user.name }}</Text>
          </div>
          <v-skeleton-loader
            v-if="user === null"
            type="sentences"
          />
          <div v-else>
            <Text color="skeleton">Joined at {{ user.createdAt.toLocaleDateString() }}</Text>
            <Text>{{ user.description }}</Text>
          </div>
        </div>
      </template>
    </DataProvider>

    <v-divider class="mx-2" />
    <Posts :user-id="userId" />
  </div>
</template>

<style scoped>
</style>
