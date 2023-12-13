<script lang="ts" setup>
const { query, updateQuery } = useQuery()

const tab = ref()
watch(tab, nextTab => updateQuery('t', nextTab))

tab.value = query.t
const searchParam = String(query.q)
</script>

<template>
  <div>
    <v-tabs
      v-model="tab"
    >
      <v-tab value="post">image</v-tab>
      <v-tab value="user">user</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="post">
        <Posts :search-param="searchParam" />
      </v-window-item>

      <v-window-item value="user">
        <Users :search-param="searchParam" />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
</style>
