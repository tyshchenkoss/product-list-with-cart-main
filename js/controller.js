import * as model from "./model.js";
import productsView from "./view/productsView.js";
import cartView from "./view/cartView.js";
import orderConfirmedView from "./view/orderConfirmedView.js";

export const controllCloseOrderConfirmed = function () {
  model.clearCart();
  cartView.render(model.state.cart);
  productsView.render(model.state);
};

export const controllShowOrderConfirmed = function () {
  orderConfirmedView.render(model.state.cart);
};

export const controllAddToBucket = function (dessertName, count) {
  model.addToCart(dessertName, count);
  cartView.render(model.state.cart);
  productsView.render(model.state);
};

export const controllRemoveItemFromCart = function (dessertName) {
  model.removeFromCart(dessertName);
  cartView.render(model.state.cart);
  productsView.render(model.state);
};

export const controllLoadDesserts = async function () {
  await model.loadData();
  productsView.render(model.state);
};

export const init = function () {
  productsView.addHandlerLoadProducts(controllLoadDesserts);
  cartView.addHandlerRemoveFromBucket(controllRemoveItemFromCart);
  cartView.addHandlerConfirmOrder(controllShowOrderConfirmed);
  productsView.addHandlerAddToBucket(controllAddToBucket);
  orderConfirmedView.addHandlerCloseConfirmedOrder(controllCloseOrderConfirmed);
};

init();
