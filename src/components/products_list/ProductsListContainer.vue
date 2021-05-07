<template>
	<div class="columns is-centered is-multiline">
		<div
			class="card column is-one-quarter"
			v-for="product in products"
			:key="product.id"
		>
			<products :product="product"></products>
		</div>
		<div class="section" v-if="products.length === 0">
			<p>{{ noProductLabel }}</p>
		</div>
	</div>
</template>

<script>
	import products from '../Products';

	export default {
		name: 'productsList',

		components: { products },

		data() {
			return {
				noProductLabel: 'No Products to Show!!!',
			};
		},

		computed: {
			products: {
				get() {
					return this.$store.state.products;
				},
				set(value) {
					this.$store.commit('updateProdcuts', value);
				},
			},
		},
	};
</script>

<style lang="scss" scoped>
	.card {
		margin: 10px;
	}
</style>
