(function() {
  'use strict';

  const HttpService = window.HttpService;

  const menuData = {
      title: 'Сохраненный список',
      items: []
  };

  const itemInput = {
    input: 'www.sap.com'
  };

  /** Main data manipulation class */
  class Controller {
    /** Create application controller
     * @param {Object} store Application data store
     */
    constructor(store) {
      this.store = store;
      // set initial values
      this.store.menuData = menuData;
      this.store.itemInput = itemInput;

      this.httpService = new HttpService();
    }

    /**
     * Append new menu item into Menu
     * @param {string} title New menu item title
     */
    addMenuItem(title) {
      if (title !== '') {
        this.store.menuData.items.push({title: title});
        this.store.itemInput.input = '';
      }
    }

    /**
     * Remove menu item from Menu by index
     * @param {number} index Index of menu item to be removed
     */
    removeMenuItem(index) {
      if (index >= 0 && index < this.store.menuData.items.length) {
        this.store.menuData.items.splice(index, 1);
      }
    }

    /**
     * Load Menu data via HTTP request
     */
    loadMenuData() {

    }
  }

  window.Controller = Controller;
})();
