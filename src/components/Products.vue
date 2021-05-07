<template>
	<div>
		<div class="card-image">
			<figure class="image is-4by3">
				<img :src="product.images[0]" alt="product image" />
			</figure>
		</div>
		<div class="card-content">
			<div class="media">
				<div class="media-content">
					<p class="title is-4">{{ product.name }}</p>
				</div>
			</div>
			<div class="content is-clearfix">
				<p>{{ product.description }}</p>
				<p class="is-pulled-right">
					<span class="title is-4"
						><strong>{{ product.price | currency }}</strong></span
					>
				</p>
			</div>
			<div class="card-footer btn-actions">
				<div class="card-footer-item field is-grouped">
					<div class="buttons">
						<button
							class="button is-primary"
							v-if="!product.isAddedToCart"
							@click="addToCart(product)"
						>
							{{ addToCartLabel }}
						</button>
					</div>
					<div class="select is-rounded is-small">
						<select v-model="selected">
							<option v-for="quantity in quantityArray" :value="quantity" :key="quantity">{{
								quantity
							}}</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<router-link
			class="details"
			:to="{
				name: 'product_detail-name',
				params: {
					id: product.id,
					name: product.name,
					price: product.price,
				},
			}"
		>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'products',
		props: ['product'],

		data() {
			return {
				addToCartLabel: 'Buy',
				viewDetailsLabel: 'Details',
				selected: 1,
				quantityArray: [],
			};
		},

		mounted() {
			for (let i = 1; i <= 5; i++) {
				this.quantityArray.push(i);
			}

			if (this.$props.product.quantity > 1) {
				this.selected = this.$props.product.quantity;
			}
		},
		methods: {
			addToCart(product) {
				let item = {
					Name: product.name,
					Price: product.price,
					Id: product.id,
					Quantity: this.selected,
				};
				this.$store.commit('addToCart', item);
				this.selected = 1;
				this.$store.commit('showCheckoutModal', true);
			},
			removeFromCart(item) {
				this.$store.commit('removeFromCart', item);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.details {
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

		&:hover {
			border: 1px solid #51bafc;
		}
	}
	.button,
	.select {
		z-index: 2;
	}
	.select {
		position: absolute;
		right: 15px;
		bottom: 35px;
	}
	.card-content {
		padding: 0;
	}
	.buttons {
		margin: 0;
	}
</style>
