<template>
  <v-action-sheet ref="actionSheet" :closed="handleClosed">
    <div class="v-action-sheet__group">
      <div class="v-action-sheet__label" v-if="title">{{title}}</div>
      <div v-for="button in buttons" class="v-action-sheet__button" @click="close(button.action)">{{button.text}}</div>
    </div>
    <div class="v-action-sheet__group">
      <div class="v-action-sheet__button v-action-sheet__button--bold" @click="close(cancel.action)">{{cancel.text}}</div>
    </div>
  </v-action-sheet>
</template>

<script>
// import { unLockHeader } from '@/utils/cordova';
import ActionSheetContainer from './action-sheet-container';

export default {
  props: {
    title: {
      type: String,
    },
    buttons: {
      type: Array,
      required: true,
    },
    cancel: {
      type: Object,
      default() {
        return {
          text: 'Cancel',
        };
      },
    },
    closed: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  methods: {
    close(action) {
      this.$refs.actionSheet.close();
      // unLockHeader();
      if (action && typeof action === 'function') {
        action.call(this);
      }
      this.handleClosed();
    },
    handleClosed() {
      if (this.closed && typeof this.closed === 'function') {
        this.closed();
      }
    },
  },
  mounted() {
    this.$refs.actionSheet.show();
    this.$vuego.closeModal = this.close;
  },
  components: {
    [ActionSheetContainer.name]: ActionSheetContainer,
  },
};
</script>
