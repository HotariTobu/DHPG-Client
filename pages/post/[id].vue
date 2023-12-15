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
        <div class="pa-2 pa-sm-10 d-flex flex-column">
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
        <div class="mt-4">
          <v-skeleton-loader
            v-if="post === null"
            type="sentences"
          />
          <div v-else>
            <div class="text-h6 text-sm-h5 text-md-h4">{{ post.title }}</div>
            <div class="mt-2 text-disabled">Posted at {{ post.createdAt.toLocaleString() }}</div>
            <div>{{ post.description }}</div>
          </div>
          <DataProvider
            class="mt-2"
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
                  class="elevation-2"
                  :image="user.icon"
                />
                <div class="ms-2">
                  <v-skeleton-loader
                    v-if="user === null"
                    type="text"
                  />
                  <div
                    v-else
                    class="text-medium-emphasis"
                  >{{ user.name }}</div>
                </div>
              </NuxtLink>
            </template>
          </DataProvider>
        </div>
      </template>
    </DataProvider>
  </div>
</template>
