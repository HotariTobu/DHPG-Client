<script lang="ts" setup>
import type Thumbnail from '~/schemas/thumbnail';

const { page, pageOffset } = usePagination()

const props = defineProps<{
  get: (pageOffset?: number) => Promise<Thumbnail[]>
}>()

const { data, pending, error } = await useLazyAsyncData(() => {
  return props.get(pageOffset)
})

const thumbnails = data.value
</script>

<template>
  <div v-if="error === null">
    <VContainer>
      <VRow v-if="pending || thumbnails === null">
        <VCol
          cols="3"
          v-for="i in 12"
          :key="i"
        >
          <VSkeletonLoader type="image" />
        </VCol>
      </VRow>
      <VRow v-else>
        <VCol
          v-for="thumbnail of thumbnails"
          :key="thumbnail.postId"
        >
          <NuxtLink :to="`/post/${thumbnail.postId}`">
            <VImg :src="thumbnail.thumbnail" />
          </NuxtLink>
        </VCol>
      </VRow>
    </VContainer>
    <ClientOnly>
      <VPagination
        :length="page"
        v-model="page"
      />
    </ClientOnly>
  </div>
  <div v-else>
    <VAlert
      class="ma-4"
      type="error"
    >{{ error }}</VAlert>
  </div>
</template>

<style scoped>
</style>
~/schemas/thumbnail
