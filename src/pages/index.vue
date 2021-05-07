<template>
	<div>
		<productsList />
	</div>
</template>

<script>
	import productsList from '../components/products_list/ProductsListContainer.vue';

	export default {
		name: 'index',
		components: {
			productsList,
		},
	};
</script>

<style lang="scss" scoped></style>
