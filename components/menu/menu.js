(function() {
    'use strict';

/** Class representing a Menu. */
    class Menu extends AbstractControl {
      /**
       * Create Menu
       * @param {Object} param contains HTML element and Menu data
       * @param {HTMLElement} param.el HTML element for new Menu
       * @param {Array} param.data Menu data
       */
        constructor({el, data}) {
          super({el: el, data: data});

          this.template = `<div class='menu menu__title'>{{title}}</div>
                            <ul class='menu menu__list'>
                              {{#each items}}
                                <li value='{{@index}}'>{{this.title}}
                                     <sup>x</sup></li>
                              {{else}}
                                <li>нет записей</li>
                              {{/each}}
                            </ul>`;

          this.initEvents();
        }

        /**
         * Init event handlers
         */
        initEvents() {
          this.$el.addEventListener('click', this.toggleDisplayMenu.bind(this));
          this.$el.addEventListener('click', this.removeItem.bind(this));
        }

        /**
         * Open / close menu
         * @param {Event} ev DOM event
         */
        toggleDisplayMenu(ev) {
          let currentItem = ev.target;

          if (currentItem.tagName == 'DIV') {
            this.$el.classList.toggle('_open');
          }
        }

        /**
         * Remove menu item (e.g. on button "Remove" click)
         * @param {Event} event DOM event
         */
        removeItem(event) {
          const currentRemoveIcon = event.target;

          if (currentRemoveIcon.tagName == 'SUP') {
            const currentItem = currentRemoveIcon.closest('li');
            const itemIndex = currentItem.getAttribute('value');
            let ev = new CustomEvent('remove_menu_item', {
              bubbles: true,
              detail: {index: itemIndex}
            });
            this.$el.dispatchEvent(ev);
            event.preventDefault();
          }
        }
      }

      window.Menu = Menu;
})();
