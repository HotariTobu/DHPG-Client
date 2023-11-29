<script lang="ts" setup>
import type Post from '~/schemas/post';
import type User from '~/schemas/user';

const postId = useId()
</script>

<template>
  <div>
    <DataProvider
      :url="`/user/${postId}`"
      :dummy="({} as Post)"
    >
      <template #default="{ data: post }">
        <div>
          <div class="d-flex flex-column">
            <v-img
              v-for="content of post.contents"
              :src="content"
            />
          </div>
          <v-card>
            <DataProvider
              :url="`/user/${post.userId}`"
              :dummy="({} as User)"
            >
              <template #pending>
                <v-skeleton-loader type="list-item-avatar" />
              </template>
              <template #default="{ data: user }">
                <NuxtLink :to="`/user/${post.userId}`">
                  <v-avatar :image="user.icon" />
                  <div class="text-medium-emphasis">{{ user.name }}</div>
                </NuxtLink>
              </template>
            </DataProvider>
            <div class="text-h6 text-md-h5 text-lg-h4">{{ post.title }}</div>
            <div class="text-gray">Created at {{ post.createdAt }}</div>
            <div>{{ post.description }}</div>
          </v-card>
        </div>
      </template>
    </DataProvider>
  </div>
</template>

<style scoped>
</style>
