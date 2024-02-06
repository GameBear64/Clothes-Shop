import { reactive } from 'vue';

export const cart = reactive({
  cartItems: [],
});

export const addToCart = item => {
  const existingItem = cart.cartItems.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.cartItems.push({ ...item, quantity: 1 });
  }
};

export const removeFromCart = itemId => {
  const existingItem = cart.cartItems.find(cartItem => cartItem.id === itemId);

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    cart.cartItems = cart.cartItems.filter(cartItem => cartItem.id !== itemId);
  }
};

export const clearCart = () => {
  cart.cartItems = [];
};
