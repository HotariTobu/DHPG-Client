<script lang="ts" setup>
const { query, updateQuery } = useQuery()

const tab = ref()
watch(tab, nextTab => updateQuery('t', nextTab))

tab.value = query.t

const search: {
  param?: string
} = {}

if (query.q) {
  search.param = String(query.q)
}
</script>

<template>
  <div>
    <SearchField
      class="d-sm-none ma-4"
      :default-param="search.param"
      @search="param => updateQuery('q', param, '/search')"
    />

    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab value="post">image</v-tab>
      <v-tab value="user">user</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="post">
        <Posts :search-param="search.param" />
      </v-window-item>

      <v-window-item value="user">
        <Users :search-param="search.param" />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
</style>
