<script lang="ts" setup></script>

<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-4">
          <v-form>
            <v-text-field label="Name" required />
            <v-text-field label="Email" required />
            <PasswordField />
            <v-btn color="blue">Sign Up</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
