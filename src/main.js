// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import App from './App';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
	store,
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
});
