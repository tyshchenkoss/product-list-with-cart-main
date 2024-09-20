class ProductsView {
  #data = null;
  #parentEl = document.querySelector(".list");

  addHandlerLoadProducts(handlerFunction) {
    window.addEventListener("load", (e) => {
      handlerFunction();
    });
  }

  addHandlerAddToBucket(handlerFunction) {
    this.#parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".item__btn--increment");
      if (!btn) {
        return;
      }
      const count = +btn.dataset.count;
      handlerFunction(btn.dataset.name, count);
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentEl.textContent = "";
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return this.#data.desserts
      .map((des) => this.#generateMarkupDessert(des, this.#data.cart))
      .join("");
  }

  #generateMarkupDessert(dessert, cart) {
    const fromCart = cart.find((el) => el.dessert.name === dessert.name);
    return `
      <div class="item">
        <div class="item__img-box">
          <img
            class="item__img"
            src="${dessert.image.desktop}"
            alt='dessert image'
          />

          ${
            !fromCart
              ? this.#generateEmptyButton(dessert)
              : this.#generateButtonWithCounters(dessert, fromCart.count)
          }
         
        </div>

        <div class="item__text-box">
          <p class="item__subheading">${dessert.category}</p>
          <h3 class="item__heading">${dessert.name}</h3>
          <p class="item__price">$${dessert.price.toFixed(2)}</p>
        </div>
      </div>
    `;
  }

  #generateEmptyButton(dessert) {
    return `
      <button class="item__btn item__btn--empty item__btn--increment" data-name='${dessert.name}' data-count='1'>
        <img
          src="./assets/images/icon-add-to-cart.svg"
          alt="add to cart"
        />
        <p>Add to Cart</p>
      </button>
    `;
  }

  #generateButtonWithCounters(dessert, counter = 1) {
    console.log("generate with counter");
    return `
    <button class="item__btn item__btn--counter" data-name="Test dessert">
      <img
        class="item__btn--icon item__btn--increment"
        src="./assets/images/icon-decrement-quantity.svg"
        data-name="${dessert.name}"
        data-count="${counter - 1}"
        alt='decrement svg'
      />
      <span>${counter}</span>
      <img
        class="item__btn--icon item__btn--increment"
        src="./assets/images/icon-increment-quantity.svg"
        data-name="${dessert.name}"
        data-count="${counter + 1}"
        alt='increment svg'
      />
    </button>`;
  }
}

export default new ProductsView();
