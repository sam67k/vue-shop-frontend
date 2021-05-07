import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
	state: {
		cart: cart ? JSON.parse(cart) : [],
		products: [],
		systemInfo: {
			openCheckoutModal: false,
		},
	},
	getters: {
		productsAdded: (state) => {
			return state.cart;
		},
		getProductByName: (state) => (name) => {
			return state.products.find((el) => el.name == name);
		},
		isCheckoutModalOpen: (state) => {
			return state.systemInfo.openCheckoutModal;
		},
	},
	mutations: {
		addToCart(state, item) {
			let found = state.cart.find((el) => el.Id == item.Id);

			if (found) {
				found.Quantity += item.Quantity;
			} else {
				state.cart.push(item);
			}

			this.commit('saveData');
		},

		saveData(state) {
			window.localStorage.setItem('cart', JSON.stringify(state.cart));
		},

		removeFromCart(state, item) {
			let index = state.cart.indexOf(item);
			state.cart.splice(index, 1);

			this.commit('saveData');
		},
		updateProdcuts: (state, value) => {
			state.products = value;
		},
		showCheckoutModal: (state, show) => {
			state.systemInfo.openCheckoutModal = show;
		},
	},
});
