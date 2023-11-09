<script lang="ts" setup>
const tab = ref()
</script>

<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tab value="post">画像</v-tab>
      <v-tab value="user">ユーザー</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="post">
        post
      </v-window-item>

      <v-window-item value="user">
        user
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped></style>
