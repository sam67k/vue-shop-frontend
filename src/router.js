import Vue from 'vue';
import Router from 'vue-router';

import index from './pages/index.vue';
import product_detail from './pages/product_detail/_name.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: index,
			name: 'index',
		},
		{
			path: '/product/:name',
			component: product_detail,
			name: 'product_detail-name',
		},
	],
});

export default router;
