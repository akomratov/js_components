(function() {
    'use strict';

   /** Class representing a Form. */
    class Form extends AbstractControl {
      /**
       * Create Form
       */
       constructor({el, data}) {
        super({el: el, data: data});
        this.template = `<form><label>Site URL</label>
                           <input type="text" class="js-input"
                                  value="{{this.itemInput.input}}"></input>
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
        this.data.input = val;
        let ev = new CustomEvent('add_menu_item', {
          bubbles: true,
          detail: {title: val}
        });
        this.$el.dispatchEvent(ev);
        event.preventDefault();
      }
    }

    window.Form = Form;
})();
