import {Controller} from '../controller/controller.js';
import {Form} from '../form/form.js';
import {Menu} from '../menu/menu.js';

const store = {
  menuData: {},
  itemInput: {}
};

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
            data: store
        });

        // Create Form control
        this.form = new Form({
          el: el.querySelector('.js-form'),
          data: store
        });

        this.controls = [];
        this.controls.push(this.menu);
        this.controls.push(this.form);

        this._initEvents(el);

        this.controller = new Controller(store, this.controls);

        // Run Rendering cycle
        setInterval(this.render.bind(this), 50);
    }

    /**
     * Add event handlers common for nested components
     * @param {HTMLElement} el HTML element for event handling
     * @private
     */
     _initEvents(el) {
       el.addEventListener('add_menu_item', this._onAddMenuItem.bind(this));
       el.addEventListener('remove_menu_item',
                          this._onRemoveMenuItem.bind(this));
     }

     /**
      * Custom event 'add_menu_item' handler
      * @param {Event} event Custom event ('add_menu_item')
      * @private
      */
      _onAddMenuItem(event) {
        this.controller.addMenuItem(event.detail.title);
        // this.form.setOutdated();
        // this.menu.setOutdated();
      }

      /**
       * Custom event 'remove_menu_item' handler
       * @param {Event} event Custom event ('remove_menu_item')
       * @private
       */
      _onRemoveMenuItem(event) {
        this.controller.removeMenuItem(event.detail.index);
        // this.menu.setOutdated();
      }

      /**
       * Render all controls created in app.
       * Only outdated cotrols will be rendered.
       */
      render() {
        this.controls.forEach((control) => control.render());
      }
}

window.App = App;
