<script lang="ts" setup>
import type Thumbnail from '~/schemas/thumbnail';

interface ThumbnailResponse {
  totalPageCount: number,
  thumbnails: Thumbnail[],
}

const { page, pageOffset } = usePagination()

const props = defineProps<{
  userId?: number,
  searchParam?: string,
}>()

const config = {
  params: {
    pageOffset,
    ...props,
  }
}
</script>

<template>
  <DataProvider
    url="/thumbnail"
    :config="config"
    :dummy="({} as ThumbnailResponse)"
  >
    <template #pending>
      <v-container>
        <v-row>
          <v-col
            cols="3"
            v-for="i in 12"
            :key="i"
          >
            <v-skeleton-loader type="image" />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #default="{ data }">
      <v-container>
        <v-row>
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
