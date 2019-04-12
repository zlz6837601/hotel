<template>
    <div class="calendarBtn">
        <div class="cancel" @click="cancelClick">{{cancelText}}</div>
        <div class="confirm" @click="confirmClick">{{confirmText}}</div>
    </div>
</template>

<script>
export default {
  name: 'rf-footer-tab',
  props: {
    cancelFunction: {
      type: Function,
    },
    confirmFunction: {
      type: Function,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确认',
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    cancelClick(){
        this.cancelFunction();
    },
    confirmClick(){
        this.confirmFunction();
    }
  },
  watch: {

  },
};
</script>

<style lang="less">


.calendarBtn {
        width: 100%;
        height: 2.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: url("~@/assets/img/buttonBox.png") no-repeat center/cover;
        display: flex;
        justify-content: space-around;
        &>div {
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 2.25rem;
        }
        .cancel {
            color: #454854;
            font-size: 0.8rem;
        }
        .confirm {
            color: #fff;
            font-size: 0.8rem
        }
    }
    @media only screen 
    and (-webkit-device-pixel-ratio: 3) 
    and (device-height: 812px) 
    and (device-width: 375px) {
        .calendarBtn {
            height: 2.75rem;
        }
    }
    @media only screen 
    and (-webkit-device-pixel-ratio: 3) 
    and (device-height: 896px) 
    and (device-width: 414px) {
        .calendarBtn {
            height: 2.75rem;
        }
    }
    @media only screen 
    and (-webkit-device-pixel-ratio: 2) 
    and (device-height: 896px) 
    and (device-width: 414px) {
        .calendarBtn {
            height: 2.75rem;
        }
    }
    
// @media only screen
//   and (device-width : 375px)
//   and (device-height : 812px)
//   and (orientation: landscape)
//   and (-webkit-device-pixel-ratio : 3) {
//     .v-content {
//       padding: 0 34px;
//     }
//   }
</style>
