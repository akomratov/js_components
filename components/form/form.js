(function() {
    'use strict';

   /** Class representing a Form. */
    class Form extends AbstractControl {
      /**
       * Create Form
       */
       constructor({el}) {
        super({el: el});
        this.template = `<form><label>Url</label>
                           <input type="text" class="js-input"></input>
                           <input type="submit"></input>
                         </form>`;
        this._initEvents(el);
      }

      /**
       * Add form event handlers
       * @param {HTMLElement} el HTML element of form
       * @private
       */
      _initEvents(el) {
        el.addEventListener('submit', this._onSubmit.bind(this));
      }

      /**
       * On form submit handler
       * @param {Event} event Form submit event
       * @private
       */
      _onSubmit(event) {
        let val = this.$el.querySelector('input.js-input').value;
        let ev = new CustomEvent('add_menu_item', {
          bubbles: true,
          detail: {url: val}
        });
        this.$el.dispatchEvent(ev);
        event.preventDefault();
      }
    }

    window.Form = Form;
})();
