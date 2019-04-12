<template>
  <div class="v-page" :class="[hasHeader, hasFooter]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'v-page',
  props: {
    header: Boolean,
    footer: Boolean,
    swipeLeft: Function,
  },
  data() {
    return {
      hammer: null,
    };
  },
  computed: {
    hasHeader() {
      return this.header ? 'v-page--has-header' : '';
    },
    hasFooter() {
      return this.footer ? 'v-page--has-footer' : '';
    },
  },
};
</script>
