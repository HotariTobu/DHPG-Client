<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
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

const { lg, md, sm } = useDisplay()
const cols = computed(() => lg.value ? 2 : md.value ? 3 : sm.value ? 4 : 6)
</script>

<template>
  <DataProvider
    url="/thumbnail"
    :config="config"
    :dummy="({} as ThumbnailResponse)"
  >
    <template #="{ data }">
      <v-container>
        <v-row>
          <v-col
            v-if="data === null"
            :cols="cols"
            v-for="i in 12"
            :key="i"
          >
            <v-skeleton-loader type="image" />
          </v-col>
          <v-col
            v-else
            :cols="cols"
            v-for="thumbnail of data.thumbnails"
            :key="thumbnail.postId"
          >
            <NuxtLink :to="`/post/${thumbnail.postId}`">
              <v-img
                aspect-ratio="1"
                cover
                :src="thumbnail.src"
              />
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
      <ClientOnly v-if="data">
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
