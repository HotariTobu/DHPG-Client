<script lang="ts" setup>
import type Post from '~/schemas/post';
import type User from '~/schemas/user';

const postId = useId()
</script>

<template>
  <div class="mx-4">
  <DataProvider
    class="mx-auto"
    :style="{
      maxWidth: '600px',
    }"
    :url="`/post/${postId}`"
    :dummy="({} as Post)"
  >
    <template #="{ data: post }">
      <div class="pa-10 d-flex flex-column">
        <v-skeleton-loader
          v-if="post === null"
          type="image"
        />
        <v-img
          v-else
          v-for="content of post.contents"
          :src="content"
        />
      </div>
      <div>
        <v-skeleton-loader
          v-if="post === null"
          type="sentences"
        />
        <div v-else>
          <Text class="text-h6 text-md-h5 text-lg-h4">{{ post.title }}</Text>
          <Text color="skeleton">Posted at {{ post.createdAt.toLocaleString() }}</Text>
          <Text>{{ post.description }}</Text>
        </div>
        <DataProvider
          v-if="post"
          :url="`/user/${post.userId}`"
          :dummy="({} as User)"
        >
          <template #="{ data: user }">
            <NuxtLink
              class="d-flex align-center"
              :to="`/user/${post.userId}`"
            >
              <v-skeleton-loader
                v-if="user === null"
                type="avatar"
              />
              <v-avatar
                v-else
                :image="user.icon"
              />
              <v-skeleton-loader
                v-if="user === null"
                type="text"
              />
              <Text
                v-else
                class="text-medium-emphasis"
              >{{ user.name }}</Text>
            </NuxtLink>
          </template>
        </DataProvider>
      </div>
    </template>
  </DataProvider>
  </div>
</template>
