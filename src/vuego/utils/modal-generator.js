import Vue from 'vue';
// import { lockHeader } from '@/utils/cordova';

export default function (ModalComponent) {
  return {
    create(props) {
      const node = document.createElement('div');
      document.body.appendChild(node);

      const vm = new Vue({
        el: node,
        data() {
          return { props };
        },
        render: h => h(ModalComponent, { props }),
      });
      // lockHeader();

      return {
        close(fn) {
          vm.close(fn);
        },
      };
    },
  };
}
