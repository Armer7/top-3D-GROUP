export class Menu {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.hFirst = this.$el.querySelector(`.h-first`);
    this.setup();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.sign = this.$el.querySelector('[data-type="sign-in"]');
  }

  clickHandler(event) {
    try {
      const { type } = event.target.closest("[data-type]").dataset;
      const item = event.target.closest(".mobile-menu__list__item");
      if (type === "open-search" || type === "close-search") {
        this.hFirst.classList.toggle("showSearch");
      } else if (type === "menu-mobile" || type === "popup-menu") {
        this.$el
          .querySelector('[data-type="menu-mobile"]')
          .classList.toggle("open-menu");
        this.$el
          .querySelector('[data-type="popup-menu"]')
          .classList.toggle("show");
      } else if (item && item.children.length > 1) {
        this.openMenu(item);
      } else if (type === "popup-back") {
        this.closeMenu();
      }
    } catch (e) {
      const a = e;
    }
  }

  toggleChildren(item, selector) {
    item.children.forEach((item) => {
      item.classList.toggle(selector);
    });
  }

  openMenu(item) {
    const parent = item.parentElement;
    if (!this.sign.classList.contains("active")) {
      this.sign.classList.add("active");
    }
    const ul = item.children[1];
    this.toggleChildren(parent, "active");
    if (parent.classList.contains("is-open")) {
      parent.classList.remove("is-open");
      parent.classList.add("active");
    }
    item.classList.add("active");
    item.children[0].classList.add("hidden");
    ul.classList.add("is-open");
    this.toggleChildren(ul, "active");
  }

  closeMenu() {
    const open = this.$el.querySelector(".is-open");
    if (open) {
      const parentLi = open.parentElement;
      const parenUl = parentLi.parentElement;
      this.toggleChildren(open, "active");
      open.classList.remove("is-open");
      this.toggleChildren(parenUl, "active");
      parentLi.classList.add("active");
      parentLi.children[0].classList.remove("hidden");
      if (parenUl.classList.contains("nested")) {
        parenUl.classList.remove("active");
        parenUl.classList.add("is-open");
      } else {
        this.sign.classList.remove("active");
      }
    }
  }
}
