(function() {
  'use strict';
  /** Class for Abstract Control to be extended by each component */
  class AbstractControl {
    /**
     * Create abstract control
     * @param {Object} param Object with parameters
     * @param {HTMLElement} param.el HTML element for control placement
     * @param {Object} param.data Data object binded to Control
     */
    constructor({el, data={}}) {
      this.$el = el;
      this.data = data;
      this.outdated = true;
      this.template = '<div class=".js-stub">stub</div>';
      this.te = window.Handlebars;
    }

    /**
     * Marks control as outdated. Control will be rendered
     */
     setOutdated() {
       this.outdated = true;
     }

    /**
     * Render control using template html
     */
    render() {
      if (this.outdated) {
        this.$el.innerHTML = this.te.compile(this.template)(this.data);
        this.outdated = false;
      }
    }
  }

  window.AbstractControl = AbstractControl;
})();
