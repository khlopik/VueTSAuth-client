import Vue from 'vue';
import Vuex from 'vuex';
import mutationsLogger from 'vuex/dist/logger';
import { types, modules, getters } from './modules';
// import actionsLogger from './plugins/actionsLogger'

Vue.use(Vuex);

export { types };
export default new Vuex.Store({
	modules,
	getters,
	plugins: process.env.NODE_ENV === 'development'
		? [mutationsLogger()]
		: [],
});
