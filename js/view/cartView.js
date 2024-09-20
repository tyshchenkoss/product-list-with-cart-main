class CartView {
  #parentEl = document.querySelector(".cart");
  #data;

  addHandlerConfirmOrder(handlerFunction) {
    this.#parentEl.addEventListener("click", (e) => {
      const confirmBtn = e.target.closest(".cart__btn");
      if (!confirmBtn) {
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      handlerFunction();
    });
  }

  addHandlerRemoveFromBucket(handlerFunction) {
    this.#parentEl.addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".cart__btn--remove");
      if (!removeBtn) {
        return;
      }
      const dessertName = removeBtn.dataset.name;
      handlerFunction(dessertName);
    });
  }

  render(data) {
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentEl.textContent = "";
  }

  #generateMarkup() {
    if (this.#data.length === 0) {
      return this.#generateEmptyCartMarkup();
    } else {
      return this.#generateCartMarkup();
    }
  }

  #generateCartMarkup() {
    const totalItems = this.#data.reduce((acc, curr) => (acc += curr.count), 0);
    const totalSum = this.#data
      .map((s) => s.count * s.dessert.price)
      .reduce((acc, current) => (acc += current), 0);

    return `
    <div class="cart">
      <h2 class="cart__heading">Your Cart (${totalItems})</h2>
      <div class="cart__content">
        ${this.#data.map((item) => this.#generateCartItemMarkup(item)).join("")}
        <div class="cart__total">
          <span class="cart__total--heading">Order Total</span>
          <span class="cart__total--price">$${totalSum}</span>
        </div>
        <div class="cart__carbon">
          <img
            class="cart__carbon--img"
            src="./assets/images/icon-carbon-neutral.svg"
            alt='carbon svg'
          />
          <span
            >This is a <span class="bold">carbon-neutral</span> delivery</span
          >
        </div>
        <button class="cart__btn">
          <p>Confirm Order</p>
        </button>
      </div>
    </div>
    `;
  }

  #generateCartItemMarkup(item) {
    return `
        <div class="cart__item">
        <div class="cart__item--details">
          <h3 class="cart__item--heading">${item.dessert.name}</h3>
          <div class="cart__item--price-box">
            <span class="cart__item--count">${item.count}x</span>
            <span class="cart__item--price">@ $${item.dessert.price}</span>
            <span class="cart__item--full-price">$${
              item.count * item.dessert.price
            }</span>
          </div>
        </div>
        <button class='cart__btn--remove' data-name='${item.dessert.name}'>
          <img
            class="cart__remove-icon"
            src="./assets/images/icon-remove-item.svg"
            alt='remove icon'
          />
        </button>
      </div>
      <div class="cart__line"></div>`;
  }

  #generateEmptyCartMarkup() {
    return `
      <div class="cart">
        <h2 class="cart__heading">Your Cart (0)</h2>
        <div class="cart__content cart--empty">
          <img
            class="cart__image"
            src="./assets/images/illustration-empty-cart.svg"
            alt='empty cart image'
          />
          <p class="cart__message">Your added items will appear here</p>
        </div>
      </div>
    `;
  }
}

export default new CartView();
