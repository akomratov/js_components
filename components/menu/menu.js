(function() {
    'use strict';

/** Class representing a Menu. */
    class Menu {
      /**
       * Create Menu
       * @param {Object} param contains HTML element and Menu data
       * @param {HTMLElement} param.el HTML element for new Menu
       * @param {Array} param.data Menu data
       */
        constructor({el, data}) {
            this.$el = el;
            this.data = data;

            this.$el = el;
            this.$title = el.querySelector('.js-title');
            this.$menuList = el.querySelector('.js-menu-list');

            this.initEvents();
        }

        /**
         * Set menu data, which represents structure content
         * @param {Object} data - Menu data
         */
        setData(data) {
          this.data = data;
          this.render();
        }

        /**
         * Add Menu into DOM
         */
        render() {
          this.$title.innerText = this.data.title;
          this.renderItems(this.data.items, this.$menuList);
        }

        /**
         * Render Menu items
         * @param {Array} items
         * @param {HTMLElement} container HTML Element to embed new items
         */
        renderItems(items, container) {
          items.forEach((item) => {
            this._addItem(item, container);
          });
        }

        /**
         * Init event handlers
         */
        initEvents() {
          this.$title.addEventListener('click',
               this.toggleDisplayMenu.bind(this));
          this.$menuList.addEventListener('click', this.removeItem.bind(this));
        }

        /**
         * Open / close menu
         */
        toggleDisplayMenu() {
          this.$el.classList.toggle('_open');
        }

        /**
         * Remove menu item (e.g. on button "Remove" click)
         * @param {Event} ev DOM event 
         */
        removeItem(ev) {
          let currentRemoveIcon = ev.target;
          let currentItem;
          let currentList;

          if (currentRemoveIcon.tagName == 'SUP') {
            // для поддержки в IE11-
            currentItem = currentRemoveIcon.closest('li');
            currentList = currentItem.closest('ul');
            currentList.removeChild(currentItem);
          }
        }

        /**
         * Add child HTML element into Menu's HTML element
         * @param {Object} item Menu item
         * @param {HTMLElement} container for new menu child element
         * @private
         */
        _addItem(item, container) {
          let itemText = item.title;
          let ulEl = document.createElement('ul');
          let liEl = document.createElement('li');
          let spanEl = document.createElement('span');
          let removeIcon = document.createElement('sup');

          spanEl.textContent = itemText;
          removeIcon.textContent = ' x';

          liEl.append(spanEl, removeIcon);

          if (item.items) {
            liEl.append(ulEl);
            this.renderItems(item.items, ulEl);
          }

          container.append(liEl);
        }
      }

      window.Menu = Menu;
})();
