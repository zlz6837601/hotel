import Vue from 'vue';
import Toast from './toast';

export default function (text, time) {
  const node = document.createElement('div');
  document.body.appendChild(node);

  const vm = new Vue({
    el: node,
    render: h => h(Toast, { props: { message: text } }),
  });

  setTimeout(() => {
    document.body.removeChild(vm.$el);
  }, time || 2000);

  return {
    close() {
      document.body.removeChild(vm.$el);
    },
  };
}
