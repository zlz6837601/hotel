<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="v-popup" :class="[position ? 'v-popup-' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import Popup from '@/vuego/utils/popup';

  export default {
    name: 'v-popup',
    mixins: [Popup],
    props: {
      modal: {
        default: true,
      },
      modalFade: {
        default: false,
      },
      lockScroll: {
        default: false,
      },
      closeOnClickModal: {
        default: true,
      },
      popupTransition: {
        type: String,
        default: 'popup-slide',
      },
      position: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        currentValue: false,
        currentTransition: this.popupTransition,
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },
      value(val) {
        this.currentValue = val;
      },
    },
    beforeMount() {
      if (this.popupTransition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${this.position}`;
      }
    },
    mounted() {
      if (this.$isServer) return;
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    },
  };
</script>
