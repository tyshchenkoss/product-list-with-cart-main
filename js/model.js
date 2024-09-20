export const state = {
  desserts: [],
  cart: [
    // {
    //   count: 0,
    //   dessert: {},
    // },
  ],
};

export const clearCart = function () {
  state.cart = [];
};

export const loadData = async function () {
  const response = await fetch("js/data.json");
  const data = await response.json();
  state.desserts = data;
};

export const removeFromCart = function (dessertName) {
  state.cart = state.cart.filter(
    (item) => !(item.dessert.name === dessertName)
  );
};

export const addToCart = function (dessertName, count) {
  console.log(count, dessertName);
  if (count === 0) {
    removeFromCart(dessertName);
    console.log(state.cart);
    return;
  }

  const contains = state.cart.find((s) => s.dessert?.name === dessertName);
  if (contains) {
    contains.count = +count;
  } else {
    const seletedDessert = state.desserts.find(
      (dessert) => dessert.name === dessertName
    );
    const add = {
      count: +count,
      dessert: seletedDessert,
    };
    state.cart.push(add);
  }
};
