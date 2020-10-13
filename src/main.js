import Vue from 'vue';
// Store
import store from './store/index';
import App from './App.vue';
import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay,
} from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay]);

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(getAwesomeSwiper(SwiperClass));

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
