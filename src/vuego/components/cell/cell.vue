<template>
  <a class="v-cell" :href="href">
    <span class="v-cell-mask" v-if="isLink"></span>
    <div class="v-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="v-cell-wrapper">
      <div class="v-cell-title">
        <slot name="icon">
          <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="v-cell-text" v-text="title"></span>
          <span v-if="label" class="v-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="v-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="isLink" class="v-cell-allow-right"></i>
    </div>
    <div class="v-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: 'v-cell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {},
  },
  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    },
  },

  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    },
  },
};
</script>

