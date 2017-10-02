(function() {
  'use strict';
  /** Class for Abstract Control to be extended by each component */
  class AbstractControl {
    /**
     * Create abstract control
     * @param {Object} param Object with parameters
     * @param {HTMLElement} param.el HTML element for control placement
     */
    constructor({el, data={}}) {
      this.$el = el;
      this.data = data;
      this.template = '<div class=".js-stub">stub</div>';
      this.te = window.Handlebars;
    }

    /**
     * Render control using template html
     */
    render() {
      this.$el.innerHTML = this.te.compile(this.template)(this.data);
    }
  }
  window.AbstractControl = AbstractControl;
})();
