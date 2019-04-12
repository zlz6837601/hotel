<template>
  <div class="v-search">
    <div class="v-searchbar">
      <div class="v-searchbar-inner">
        <i class="v-icon v-icon-search"></i>
        <input
          ref="input"
          @click="visible = true"
          type="search"
          v-model="currentValue"
          :placeholder="placeholder"
          class="v-searchbar-core">
      </div>
      <a
        class="v-searchbar-cancel"
        @click="visible = false, currentValue = ''"
        v-show="visible"
        v-text="cancelText">
      </a>
    </div>
    <div class="v-search-list" v-show="show || currentValue">
      <div class="v-search-list-warp">
        <slot>
          <v-cell v-for="(item, index) in result" :key="index" :title="item"></v-cell>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/vuego/components/cell/cell';

export default {
  name: 'v-search',
  data() {
    return {
      visible: false,
      currentValue: this.value,
    };
  },
  components: {
    [Cell.name]: Cell,
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.currentValue = val;
    },
  },
  props: {
    value: String,
    autofocus: Boolean,
    show: Boolean,
    cancelText: {
      default: '取消',
    },
    placeholder: {
      default: '搜索',
    },
    result: Array,
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  },
};
</script>


