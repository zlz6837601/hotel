import './styles/index.less';

import Page from './components/base/page';
import Content from './components/base/content';
import Header from './components/base/header';
import Footer from './components/base/footer';
import Block from './components/base/block';
import Title from './components/base/title';

import Button from './components/button/button';
import ButtonGroup from './components/button/button-group';

import List from './components/list/list';
import Item from './components/list/item';

import Switch from './components/switch/switch';

import Tag from './components/tag/tag';

import Spinner from './components/spinner/spinner';

import Popup from './components/popup/popup';
import Picker from './components/picker/picker';
import DatetimePicker from './components/datetime-picker/datetime-picker';
import Loadmore from './components/loadmore/loadmore';
import Search from './components/search/search';

import $Dialog from './components/dialog/dialog';
import $Alert from './components/dialog/alert';
import $Confirm from './components/dialog/confirm';
import $ActionSheet from './components/action-sheet/action-sheet-generator';
import $Toast from './components/toast/toast-generator';
import $Preloader from './components/preloader/preloader-generator';

// utils
import initDPR from './utils/dpr';

window.WINDOW_TIMER = null;

export default {
  install(Vue) {
    initDPR();

    /* eslint no-param-reassign: 0 */
    Vue.prototype.$vuego = {};
    Vue.prototype.timer = WINDOW_TIMER;

    Vue.component(Page.name, Page);
    Vue.component(Content.name, Content);
    Vue.component(Header.name, Header);
    Vue.component(Footer.name, Footer);
    Vue.component(Block.name, Block);
    Vue.component(Title.name, Title);

    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);

    Vue.component(List.name, List);
    Vue.component(Item.name, Item);

    Vue.component(Switch.name, Switch);
    Vue.component(Tag.name, Tag);
    Vue.component(Spinner.name, Spinner);

    Vue.component(Popup.name, Popup);
    Vue.component(Picker.name, Picker);
    Vue.component(DatetimePicker.name, DatetimePicker);

    Vue.component(Loadmore.name, Loadmore);
    Vue.component(Search.name, Search);

    /* eslint no-param-reassign: 0 */
    Vue.prototype.$Dialog = $Dialog;
    Vue.prototype.$Alert = $Alert;
    Vue.prototype.$Confirm = $Confirm;
    Vue.prototype.$ActionSheet = $ActionSheet;
    Vue.prototype.$Toast = $Toast;
    Vue.prototype.$Preloader = $Preloader;
  },
};
