<script lang="ts" setup generic="T">
import type { AxiosRequestConfig } from 'axios';

const axios = useAxios()

const props = defineProps<{
  url: string,
  config?: AxiosRequestConfig,
  dummy: T,
}>()

const key = JSON.stringify(props)
const { pending, error, data: res } = useLazyAsyncData(key, () => {
  return axios.get<T>(props.url, props.config)
})
</script>

<template>
  <div>
    <slot
      v-if="pending"
      name="pending"
    >
      <v-skeleton-loader />
    </slot>
    <div v-else>
      <slot
        v-if="error === null"
        name="error-null"
      />
      <slot
        v-else
        name="error"
      >
        <v-alert
          class="ma-4"
          type="error"
        >{{ error }}</v-alert>
      </slot>

      <slot
        v-if="res === null"
        name="data-null"
      />
      <slot
        v-else
        :data="res.data"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
