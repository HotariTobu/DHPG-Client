<script lang="ts" setup>
import type Post from '~/schemas/post';

const axios = useAxios()
const postId = useId()

const { data, pending, error } = useLazyAsyncData(() => {
  return axios.get<Post>(`/post/${postId}`)
})

const post = data.value?.data
</script>

<template>
  <div>
    <VAlert
      class="ma-4"
      v-if="error !== null"
      type="error"
    >{{ error }}</VAlert>
    <div v-else>
      <div v-if="pending">
        <VSkeletonLoader type="image" />
      </div>
      <div v-else-if="typeof post !== 'undefined'">
        <VImg :src="post.content" />
        <VCard>
          <NuxtLink to="/user/[userId]">
            <VAvatar image="https://cdn.vuetifyjs.com/images/john.png"/>
            <div class="text-medium-emphasis">Username</div>
          </NuxtLink>
          <div class="text-h6 text-md-h5 text-lg-h4">{{ post.title }}</div>
          <div>{{ post.description }}</div>
        </VCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
