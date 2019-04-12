<template>
  <div class="v-tag" :class="[tagType]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tag',
  props: {
    type: String,
    outline: Boolean,
  },
  computed: {
    tagType() {
      return this.type && `v-tag--${this.type}`;
    },
    isOutline() {
      return this.outline && 'v-tag--outline';
    },
  },
};
</script>

<style>

</style>
