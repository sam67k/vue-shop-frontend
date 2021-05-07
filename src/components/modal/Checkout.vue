<template>
	<div :class="[openModal ? 'is-active' : '', 'modal']">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)"></button>
			</header>
			<section class="modal-card-body">
				<div v-if="cart">
					<div class="box" v-for="product in products" :key="product.productId">
						<button
							class="is-pulled-right button is-info is-inverted"
							@click="removeFromCart(product.Id)"
						>
							{{ removeLabel }}
						</button>
						<p>
							{{ product.Name }}
							{{ product.Quantity > 0 ? ` - Quantity: ${product.Quantity}` : '' }}
						</p>
						<p>{{ product.Price | currency }}</p>
					</div>
					<div v-if="products.length === 0">
						<p>{{ cartEmptyLabel }}</p>
					</div>
				</div>
				<form class="addressform" v-else-if="address" method="submit">
					<div class="field">
						<label class="label">Full Name</label>
						<div class="control">
							<input
								v-model="user.name"
								class="input"
								type="text"
								placeholder="Name"
								required
							/>
						</div>
					</div>
					<div class="field">
						<label class="label">Mobile Number</label>
						<div class="control has-icons-left has-icons-right">
							<input
								v-model="user.number"
								class="input"
								type="text"
								name="mobile_number"
								placeholder="03XXXXXXXXX"
								required
							/>
							<span class="icon is-small is-left">
								<i class="fas fa-mobile-alt"></i>
							</span>
						</div>
					</div>
					<div class="field">
						<label class="label">Email</label>
						<div class="control has-icons-left has-icons-right">
							<input
								v-model="user.email"
								class="input"
								type="email"
								placeholder="Email"
								value=""
								required
							/>
							<span class="icon is-small is-left">
								<i class="fas fa-envelope"></i>
							</span>
						</div>
					</div>
					<div class="field">
						<label class="label">Address</label>
						<div class="control">
							<textarea
								v-model="user.address"
								class="textarea"
								placeholder="Address"
								required
							></textarea>
						</div>
					</div>
				</form>
				<div v-else-if="checkout">
					<h1>
						<strong>All Items Added to Cart</strong>
					</h1>
					<ul class="block-list is-small is-centered">
						<li v-for="(product, index) in products" :key="product.productId">
							{{ index + 1 }}.
							<strong>{{ product.Name }}</strong>
							{{ product.Quantity > 0 ? ` - quantity: ${product.Quantity}` : '' }}
						</li>
					</ul>
					<br />
					<h1>
						Total Quantity: <strong>{{ totalQuantity }}</strong>
					</h1>
					<h1>
						Total Price: <strong>{{ totalPrice | currency }}</strong>
					</h1>
					<br />
					<h1>
						<strong>Shipping Details</strong>
					</h1>
					<ul class="block-list is-small is-centered">
						<li>
							Name: <strong>{{ user.name }}</strong>
						</li>
						<li>
							Phone Number: <strong>{{ user.number }}</strong>
						</li>
						<li>
							Email: <strong>{{ user.email }}</strong>
						</li>
						<li>
							Address: <strong>{{ user.address }}</strong>
						</li>
					</ul>
				</div>
				<div v-else-if="orderplaced">
					<h1>
						<strong>Your Order has been placed.</strong>
					</h1>
					<h1>
						<strong><i>confiramtion can take upto 24 hours.</i></strong>
					</h1>
				</div>
			</section>
			<footer class="modal-card-foot">
				<div v-if="products.length > 0 && cart">
					<button class="button is-success" @click="toAddress()">
						Continue
					</button>
					<button class="button is-success" @click="closeModal(false)">
						Back
					</button>
				</div>
				<div v-else-if="address">
					<button
						class="button is-success"
						type="submit"
						form="addressform"
						value="submit"
						@click="toCheckout()"
					>
						Continue
					</button>
					<button class="button is-success" @click="toCart()">
						Back
					</button>
				</div>
				<div v-else-if="checkout">
					<button class="button is-success" @click="addOrder()">
						Place Order
					</button>
					<button class="button is-success" @click="toAddress()">
						Back
					</button>
				</div>
				<div v-else-if="orderplaced">
					<button
						class="button is-success"
						type="submit"
						form="addressform"
						value="submit"
						@click="closeModal(false)"
					>
						Close
					</button>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
	import { isValidEmail, isValidNumber } from '../../assets/validators';
	import { db } from '../../firebase';

	export default {
		name: 'Checkout',

		data() {
			return {
				modalTitle: 'Cart',
				removeLabel: 'Remove',
				cartEmptyLabel: 'Your cart is empty',
				closeLabel: 'Close',
				cart: true,
				address: false,
				checkout: false,
				orderplaced: false,
				user: {
					email: '',
					name: '',
					number: '',
					address: '',
					time: '25:00:00',
				},
				order: { Info: {}, Products: [], CartQuantity: 0, CartTotalPrice: 0 },
			};
		},

		computed: {
			products() {
				return this.$store.getters.productsAdded;
			},
			openModal() {
				if (this.$store.getters.isCheckoutModalOpen) {
					return true;
				} else {
					return false;
				}
			},
			totalQuantity() {
				let productsAdded = this.$store.getters.productsAdded,
					quantity = 0;
				productsAdded.forEach((product) => {
					if (product.Quantity >= 1) {
						quantity += product.Quantity;
					}
				});
				return quantity;
			},
			totalPrice() {
				let productsAdded = this.$store.getters.productsAdded,
					pricesArray = [],
					finalPrice = '',
					quantity = 1;

				productsAdded.forEach((product) => {
					if (product.Quantity >= 1) {
						quantity = product.Quantity;
					}

					pricesArray.push(product.Price * quantity);
				});

				finalPrice = pricesArray.reduce((a, b) => a + b, 0);
				return finalPrice;
			},
		},

		methods: {
			closeModal(value) {
				this.cart = true;
				this.address = false;
				this.checkout = false;
				this.orderplaced = false;
				this.$store.commit('showCheckoutModal', value);
			},
			removeFromCart(id) {
				this.$store.commit('removeFromCart', id);
			},
			toAddress() {
				this.cart = false;
				this.address = true;
				this.checkout = false;
				this.orderplaced = false;
				this.modalTitle = 'Shipping Details';
			},
			toCart() {
				this.cart = true;
				this.address = false;
				this.orderplaced = false;
				this.modalTitle = 'Cart';
			},
			toCheckout() {
				if (
					isValidEmail(this.user.email) &&
					isValidNumber(String(this.user.number)) &&
					this.user.name.length >= 4 &&
					this.user.address.length >= 10
				) {
					this.checkout = true;
					this.address = false;
					this.cart = false;
					this.orderplaced = false;
					this.modalTitle = 'Checkout';
				} else {
					alert('Something is either missing or invalid!');
				}
			},
			toOrderPlaced() {
				this.checkout = false;
				this.address = false;
				this.cart = false;
				this.orderplaced = true;
				this.modalTitle = 'Order Placed';
			},
			reset() {
				this.order = {
					Info: {},
					Products: [],
					CartQuantity: 0,
					CartTotalPrice: 0,
				};
				this.$store.state.cart = [];
				this.user = {
					email: '',
					name: '',
					number: '',
					address: '',
				};
				this.$store.commit('saveData');
			},
			addOrder() {
				var d = new Date();
				this.user.time = d;

				this.order = {
					Info: this.user,
					Products: this.products,
					CartQuantity: this.totalQuantity,
					CartTotalPrice: this.totalPrice,
				};

				db
					.collection('orders')
					.add(this.order)
					.then(() => {
						this.reset();
						this.toOrderPlaced();
					})
					.catch((error) => {
						console.error('Error adding order: ', error);
						alert('An error occured while placing your order!');
					});
			},
		},
	};
</script>

<style scoped>
	/* .table {
		width: 100%;
		align-content: stretch;
	} */
</style>
