(function() {
    'use strict';

    const Menu = window.Menu;
    const Form = window.Form;
    //
    // const menuData = {
    //     title: 'Сайты',
    //     items: [{
    //             title: 'Первый'
    //         },
    //         {
    //             title: 'Второй',
    //             items: [{
    //                     title: 'Второй-первый'
    //                 },
    //                 {
    //                     title: 'Второй-второй',
    //                     items: [{
    //                             title: 'Второй-второй-1'
    //                         },
    //                         {
    //                             title: 'Второй-второй-2'
    //                         },
    //                         {
    //                             title: 'Второй-второй-3'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             title: 'Третий'
    //         },
    //         {
    //             title: 'Четвертый'
    //         }
    //     ]
    // };

    /** Class representing an Application, which combines all
      * the other artifacts.
      */
    class App {
      /**
       * Create Menu
       * @param {Object} param contains HTML element
       * @param {HTMLElement} param.el HTML element for new Menu
       */
        constructor({el}) {
            // Create Menu control
            this.menu = new Menu({
                el: el.querySelector('.js-menu'),
                data: {
                    title: 'Сохраненный список',
                    items: []
                }
            });

            // this.menu.setData(menuData);
            this.menu.render();

            // Create Form control
            this.form = new Form({el: el.querySelector('.js-form')});
            this.form.render();

            this._initEvents(el);
        }

        /**
         * Add event handlers common for nested components
         * @param {HTMLElement} el HTML element for event handling
         * @private
         */
         _initEvents(el) {
           el.addEventListener('add_menu_item', this._onAddMenuItem.bind(this));
         }

         /**
          * Custom event 'add_menu_item' handler
          * @param {Event} event Custom event ('add_menu_item')
          * @private
          */
          _onAddMenuItem(event) {
            this.menu.appendItem({title: event.detail.url});
          }
    }

    window.App = App;
})();
