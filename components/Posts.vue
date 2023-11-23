<script lang="ts" setup>
import type Thumbnail from '~/schemas/thumbnail';

const { page, pageOffset } = usePagination()

const props = defineProps<{
  get: (pageOffset?: number) => Promise<{
    totalPageCount: number,
    thumbnails: Thumbnail[],
  }>
}>()

const { data, pending, error } = await useLazyAsyncData(() => {
  return props.get(pageOffset)
})
</script>

<template>
  <div v-if="error === null">
    <v-container>
      <v-row v-if="pending || data === null">
        <v-col
          cols="3"
          v-for="i in 12"
          :key="i"
        >
          <v-skeleton-loader type="image" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="thumbnail of data.thumbnails"
          :key="thumbnail.postId"
        >
          <NuxtLink :to="`/post/${thumbnail.postId}`">
            <v-img :src="thumbnail.src" />
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
    <ClientOnly>
      <v-pagination
        :length="data?.totalPageCount"
        v-model="page"
      />
    </ClientOnly>
  </div>
  <div v-else>
    <v-alert
      class="ma-4"
      type="error"
    >{{ error }}</v-alert>
  </div>
</template>

<style scoped>
</style>
~/schemas/thumbnail
