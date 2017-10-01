(function() {
    'use strict';

    const Menu = window.Menu;
    const Form = window.Form;

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
            this.menu = new Menu({
                el: el.querySelector('.js-menu'),
                data: {
                    title: 'Сайты',
                    items: []
                }
            });

            this.menu.setData({
                title: 'Сайты',
                items: [{
                        title: 'Первый'
                    },
                    {
                        title: 'Второй',
                        items: [{
                                title: 'Второй-первый'
                            },
                            {
                                title: 'Второй-второй',
                                items: [{
                                        title: 'Второй-второй-1'
                                    },
                                    {
                                        title: 'Второй-второй-2'
                                    },
                                    {
                                        title: 'Второй-второй-3'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Третий'
                    },
                    {
                        title: 'Четвертый'
                    }
                ]
            });

            this.form = new Form({el: el.querySelector('.js-menu')});
        }
    }

    window.App = App;
})();
