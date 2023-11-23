<script lang="ts" setup>
const axios = useAxios()

const get = async (pageOffset?: number) => {
  const res = await axios.get('/thumbnail', {
    params: {
      pageOffset,
    }
  })
  return res.data
}
</script>

<template>
  <div>
    <Posts :get="get"/>
  </div>
</template>

<style scoped>
</style>
