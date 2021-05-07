<template>
	<div>
		<div class="section">
			<div class="card is-clearfix columns">
				<figure class="card-image is-480x480 column is-one-thirds">
					<img :src="product.images[0]" />
				</figure>
				<div class="card-content column is-two-thirds">
					<div class="card-content__title">
						<h2 class="title is-4">
							{{ product.name }}
						</h2>
					</div>
					<div class="card-content__text">
						<p>
							{{ product.description }}
						</p>
					</div>

					<div class="card-content__reviews">
						<div class="select is-rounded is-small is-pulled-right">
							<select v-model="selected">
								<option v-for="quantity in quantityArray" :value="quantity" :key="quantity">{{
									quantity
								}}</option>
							</select>
						</div>
					</div>
					<div class="card-content__price is-pulled-left">
						<span class="title is-3"
							><strong>{{ product.price | currency }}</strong></span
						>
					</div>
					<div class="card-content__btn is-pulled-right">
						<button class="button is-primary" @click="addToCart(product)">
							{{ addToCartLabel }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'product_detail-name',

		validate({ params }) {
			return /^\d+$/.test(params.id);
		},

		data() {
			return {
				addToCartLabel: 'Buy',
				selected: 1,
				quantityArray: [],
			};
		},
		computed: {
			product: {
				get() {
					return this.$store.getters.getProductByName(this.$route.params.name);
				},
			},
		},

		beforeMount() {
			this.selected =
				this.$route.params.quantity == null ? 1 : this.$route.params.quantity;

			for (let i = 1; i <= 5; i++) {
				this.quantityArray.push(i);
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
				this.$store.commit('showCheckoutModal', true);
				this.selected = 1;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.card-content {
		padding: 15px 10px 15px 10px;

		&__text {
			margin: 15px 0;
		}
		&__reviews {
			display: inline-block;
			width: 100%;
			margin-bottom: 10px;
		}
	}
	.hero.has-background {
		position: relative;
		overflow: hidden;
	}
	.hero-background {
		position: absolute;
		object-fit: cover;
		object-position: center center;
		width: 100%;
		height: 100%;
	}
	.hero-background.is-transparent {
		opacity: 0.3;
	}
	.card {
		padding-bottom: 10px;
	}
</style>
