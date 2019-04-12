<template>
  <transition :name="transition" @after-leave="afterLeave">
    <div class="v-dialog" v-show="active">
      <div class="vuego-modal">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vuego-modal',
  props: {
    transition: {
      type: String,
      default: 'vuego-modal',
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    show() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
    afterLeave() {
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>
