class OrderConfirmedView {
  #data;
  #parentEl = document.querySelector(".confirmed");
  #overlayEl = document.querySelector(".overlay");

  addHandlerCloseConfirmedOrder(handlerFunction) {
    this.#parentEl.addEventListener("click", (e) => {
      const confirmedBtn = e.target.closest(".confirmed__btn");
      if (!confirmedBtn) return;

      handlerFunction();

      this.#parentEl.textContent = "";
      this.#overlayEl.classList.toggle("hidden");
      this.#parentEl.classList.toggle("hidden");
    });
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentEl.textContent = "";
    this.#overlayEl.classList.toggle("hidden");
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#parentEl.classList.toggle("hidden");
  }

  #generateMarkup() {
    return `
      <div class="confirmed__info">
        <img
          class="confirmed__icon"
          src="./assets/images/icon-order-confirmed.svg"
          alt='confirmed icon'
        />
        <h3 class="confirmed__heading">Order Confirmed</h3>
        <p class="confirmed__enjoy">We hope you enjoy your food!</p>
      </div>

      <div class="confirmed__items-box">
        <div class="confirmed__items">
          ${this.#data.map((item, index) =>
            this.#generateItemMarkup(item, this.#data.length === index + 1)
          )}
        </div>

        <div class="cart__line"></div>

        <div class="confirmed__total">
          <span class="confirmed__total--heading">Order Total</span>
          <span class="confirmed__total--price">$46.50</span>
        </div>
      </div>

      <button class="confirmed__btn">
        <p>Start New Order</p>
      </button>
    `;
  }

  #generateItemMarkup(item, isLast) {
    return `
      <div class="confirmed__item">
        <div class="confirmed__item--box">
          <img
            class="confirmed__item--image"
            src="${item.dessert.image.thumbnail}"
            alt='dessert image'
          />
          <div class="confirmed__item--details">
            <h3 class="confirmed__item--heading">${item.dessert.name}</h3>
            <div class="confirmed__item--price-box">
              <span class="confirmed__item--count">${item.count}x</span>
              <span class="confirmed__item--price">@ $${
                item.dessert.price
              }</span>
            </div>
          </div>
        </div>
        <div class="confirmed__item--full-price">$${
          item.count * item.dessert.price
        }</div>
      </div>

      ${!isLast ? '<div class="cart__line"></div>' : ""}
      `;
  }
}

export default new OrderConfirmedView();
