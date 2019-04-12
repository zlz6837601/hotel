<template>
  <div class="v-header">
    <div class="v-header__left">
      <slot name="left"></slot>
    </div>
    <div class="v-header__center">
      <slot></slot>
    </div>
    <div class="v-header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-header',
};
</script>
