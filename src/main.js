import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueFirestore from 'vue-firestore';
require('firebase/firestore');

Vue.use(VueFirestore, {
	key: 'id', // the name of the property. Default is '.key'.
	enumerable: true, //  whether it is enumerable or not. Default is true.
});

import store from './store.js';

require('@/assets/main.scss');

Vue.config.productionTip = false;

Vue.filter('currency', (value) => {
	var number = new Intl.NumberFormat('en-PK', {
		style: 'currency',
		currency: 'PKR',
	}).format(value);
	return number;
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
