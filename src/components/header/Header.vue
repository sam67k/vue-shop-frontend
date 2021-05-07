<template>
	<div>
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link :to="{ name: 'index' }" class="navbar-item">
					<h1 class="title is-3 is-flex-mobile"></h1>
				</router-link>
			</div>
			<div class="navbar-menu is-active">
				<div class="navbar-end">
					<div class="navbar-item shopping-cart" @click="showCheckoutModal">
						<span class="icon is-medium">
							<i class="fas fa-shopping-cart fa-lg"></i>
						</span>
						<span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{
							numProductsAdded
						}}</span>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'VmHeader',

		data() {
			return {
				isCheckoutActive: false,
			};
		},
		computed: {
			numProductsAdded() {
				return this.$store.getters.productsAdded.length;
			},
		},

		methods: {
			showCheckoutModal() {
				this.$store.commit('showCheckoutModal', true);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.title {
		background: url('../../assets/logo.png') no-repeat;
		background-size: contain;
		width: 175px;
		height: 80px;
	}
	.shopping-cart {
		cursor: pointer;
	}
	a {
		color: grey;
	}
	.navbar-brand {
		padding-left: 30px;
	}
	.navbar-end {
		padding-right: 20px;
	}
	nav {
		min-height: 100px;
		background: #b9e2fc;
	}
</style>
