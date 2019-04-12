<template>
  <ul class="v-list" :class="[isLink, isInset, isMedia]"><slot></slot></ul>
</template>

<script>
export default {
  name: 'v-list',
  props: {
    link: Boolean,
    inset: Boolean,
    media: Boolean,
  },
  computed: {
    isLink() {
      return this.link ? 'v-list--link' : '';
    },
    isInset() {
      return this.inset ? 'v-list--inset' : '';
    },
    isMedia() {
      return this.media ? 'v-list--media' : '';
    },
  },
};
</script>
