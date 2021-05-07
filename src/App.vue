<template>
	<div id="app">
		<VmHeader />
		<router-view></router-view>
		<Checkout />
		<VmFooter />
	</div>
</template>

<script>
	import { db } from './firebase';

	import VmHeader from './components/header/Header';
	import VmFooter from './components/footer/Footer';
	import Checkout from './components/modal/Checkout';

	export default {
		components: {
			VmHeader,
			VmFooter,
			Checkout,
		},
		computed: {
			products: {
				get() {
					var items;
					if (this.$store.state.userInfo.hasSearched) {
						items = this.getProductByTitle();
					} else {
						items = this.$store.state.products;
					}
					return items;
				},
				set(value) {
					this.$store.commit('updateProdcuts', value);
				},
			},
		},
		firestore() {
			return {
				products: db.collection('products'),
			};
		},
	};
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #b3c0d1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #d3dce6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #e9eef3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}

	body > .el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
