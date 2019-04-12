<template>
  <vuego-modal ref="dialog">
    <div class="vuego-modal-inner">
      <div class="vuego-modal-title">{{title}}</div>
      <div class="vuego-modal-text" v-html="message">{{message}}</div>
    </div>
    <div class="vuego-modal-buttons">
      <span class="vuego-modal-button" v-for="button in buttons" @click="close(button.action)">{{button.text}}</span>
    </div>
  </vuego-modal>
</template>

<script>
import Modal from './modal';

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    message: {
      type: String,
      required: true,
      default: 'Message',
    },
    buttons: {
      type: Array,
      required: true,
      default() {
        return [{ text: 'Cancel' }];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    close(action) {
      this.$refs.dialog.close();
      this.$vuego.closeModal = null;
      if (action && typeof action === 'function') {
        action.call(this);
      }
    },
  },
  mounted() {
    this.$refs.dialog.show();
    this.$vuego.closeModal = this.close;
  },
  components: {
    [Modal.name]: Modal,
  },
};
</script>
