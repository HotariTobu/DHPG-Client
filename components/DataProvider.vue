<script lang="ts" setup generic="T">
import type { AxiosRequestConfig } from 'axios';

const axios = useAxios()

const props = defineProps<{
  url: string,
  config?: AxiosRequestConfig,
  dummy: T,
}>()

const key = JSON.stringify(props)
const { error, data: res } = useLazyAsyncData(key, () => {
  return axios.get<T>(props.url, props.config)
})
</script>

<template>
  <div>
    <slot
      v-if="error"
      name="error"
    >
      <v-alert
        class="ma-4"
        type="error"
      >{{ error }}</v-alert>
    </slot>

    <slot
      v-else
      :data="res?.data ?? null"
    />
  </div>
</template>

<style scoped>
</style>
