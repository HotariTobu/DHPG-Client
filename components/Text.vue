<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme = useTheme()

const colors = theme.current.value.colors

const props = withDefaults(defineProps<{
  color?: keyof typeof colors,
}>(), {
  color: 'text',
})
</script>

<template>
  <div :style="{
    color: colors[props.color],
  }">
    <slot />
  </div>
</template>
