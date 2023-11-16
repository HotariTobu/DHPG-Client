<script lang="ts" setup>
import type User from '~/schemas/user';

const axios = useAxios()
const userId = useId()

const { data, pending, error } = useLazyAsyncData(() => {
  return axios.get<User>(`/user/${userId}`)
})

const user = data.value?.data


const get = async (pageOffset?: number) => {
  const res = await axios.get(`/user/${userId}/post`, {
    params: {
      pageOffset,
    }
  })
  return res.data
}
</script>

<template>
  <div>
    <v-alert
      class="ma-4"
      v-if="error !== null"
      type="error"
    >{{ error }}</v-alert>
    <div v-else>
      <div v-if="pending">
        <v-skeleton-loader type="image" />
      </div>
      <div v-else-if="typeof user !== 'undefined'">
        <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />
        <div class="text-h6 text-md-h5 text-lg-h4">{{ user.name }}</div>
        <div>{{ user.description }}</div>
        <Posts :get="get" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
