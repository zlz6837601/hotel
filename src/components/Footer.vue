<template>
  <div class="rf-footer-tab">
    <div class="rf-footer-tab__inner">
      <div class="rf-footer-tab__item border-thin-right"
        v-for="(item, index) in menus"
        :key="index"
        v-if="!item.hidden"
        @click="handlePageNav(item.route)"
        :class="{'is-active': active === index}">
        <i class="rf-icon" :class="item.icon"></i>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rf-footer-tab',
  props: {
    fetching: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Number,
      default: 0,
    },
    hide: {
      type: String, // '0, 1, 2'
      default: '',
    },
  },
  data() {
    const homeText = '预定酒店';
    const recordText = '订单查询';

    return {
      menus: [{
        title: homeText,
        route: 'home',
        icon: 'clockin',
        hidden: false,
      }, {
        title: recordText,
        route: 'historyList',
        icon: 'record',
        hidden: false,
      }],
    };
  },
  methods: {
    handlePageNav(name) {
      if (this.fetching) return;

      this.$router.push({ name });
    },
  },
  watch: {
    fetching(val) {
      if (!val) {
        if (this.hide === '') return;
        const hidden = this.hide.split(',');
        for (let i = 0; i < hidden.length; i += 1) {
          if (this.menus[hidden[i]]) {
            this.menus[hidden[i]].hidden = true;
          }
        }
      }
    },
  },
};
</script>

<style lang="less">
@import '~@/style/var.less';
@import '~@/style/mixins.less';

.rf-footer-tab {
  height: 100%;
  background-color: #ffffff;
  box-shadow:0 -10px 10px -10px rgba(0, 0, 0, 0.04);
  display: flex;
  &__inner {
    flex: 1;
    display: flex;
    > div {
      &:active {
        background: #f5f5f5;
      }
      flex: 1;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #999999;
      position: relative;
      // &:first-child {
      //   .border(right, @border-color);
      // }
      i.clockin {
        display: inline-block;
        width: 16px;
        height: 18px;
        background: url('../assets/icons/rf-tab-clockin.png') center center no-repeat;
        background-size: 16px 18px;
        padding-right: 10px;
      }
      i.check-in {
        display: inline-block;
        width: 18px;
        height: 17px;
        background: url('../assets/icons/rf-tab-checkin.png') 0 center no-repeat;
        background-size: 18px 17px;
        padding-right: 10px;
      }
      i.record {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('../assets/icons/rf-tab-record.png') 0 center no-repeat;
        background-size: 18px;
        padding-right: 10px;
      }
      &.is-active {
        color: @default-color;
        i.clockin {
          background: url('../assets/icons/rf-tab-clockin-active.png') center center no-repeat;
          background-size: 16px 18px;
        }
        i.check-in {
          background: url('../assets/icons/rf-tab-checkin-active.png') 0 center no-repeat;
          background-size: 18px 17px;
        }
        i.record {
          background: url('../assets/icons/rf-tab-record-active.png') 0 center no-repeat;
          background-size: 18px;
        }
      }
    }
  }
}
</style>
