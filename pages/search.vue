<script lang="ts" setup>
const axios = useAxios()
const { query, updateQuery } = useQuery()

const tab = ref()
watch(tab, nextTab => updateQuery('t', nextTab))

tab.value = query.t
const searchParam = query.q

const get = async (pageOffset?: number) => {
  const res = await axios.get('/thumbnail', {
    params: {
      pageOffset,
      searchParam,
    }
  })
  return res.data
}
</script>

<template>
  <div>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab value="post">画像</v-tab>
      <v-tab value="user">ユーザー</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="post">
    <Posts :get="get"/>
      </v-window-item>

      <v-window-item value="user">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            title="username"
            to="/user/8"
          />
        </v-list>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
</style>
