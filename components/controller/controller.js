import {HttpService} from '../service/http_service.js';

const menuData = {
    title: 'Сохраненный список',
    items: []
};

const itemInput = {
  input: 'www.sap.com'
};

/** Main data manipulation class */
export class Controller {
  /** Create application controller
   * @param {Object} store Application data store
   * @param {Array} controls Array of controls, which should be notified
   * regarding change
   */
  constructor(store, controls) {
    this.httpService = HttpService;

    this.store = store;
    this.controls = controls;
    // set initial values
    this.store.menuData = menuData;
    this.store.itemInput = itemInput;

    this._updateView();

    this.loadMenuData();
  }

  /**
   * Append new menu item into Menu
   * @param {string} title New menu item title
   */
  addMenuItem(title) {
    if (title !== '') {
      this.store.menuData.items.push({title: title});
      this.store.itemInput.input = '';
      this.uploadMenuData(this.store.menuData);

      this._updateView();
    }
  }

  /**
   * Remove menu item from Menu by index
   * @param {number} index Index of menu item to be removed
   */
  removeMenuItem(index) {
    if (index >= 0 && index < this.store.menuData.items.length) {
      this.store.menuData.items.splice(index, 1);
      this.uploadMenuData(this.store.menuData);

      this._updateView();
    }
  }

  /**
   * Mark controls to be rerendered
   * @private
   */
  _updateView() {
    this.controls.forEach((control) => {
      control.setOutdated();
    });
  }

  /**
   * Load Menu data via HTTP request
   */
  loadMenuData() {
    const url = 'https://menudata-959fa.firebaseio.com/bookmarks/-Kvm18rMzHPN4oGBRRpU.json';
    const self = this;

    this.httpService.request('GET', url)
    .then((data) => {
      self.store.menuData.title = data.title;
      self.store.menuData.items = data.items;
      self._updateView.bind(self)();
    })
    .catch((error) => {
      console.log('error', error);
    });
  }

  /**
   * Upload Menu data to backend system
   * @param {Object} menu Menu data to be uploaded
   */
  uploadMenuData(menu) {
    const url = 'https://menudata-959fa.firebaseio.com/bookmarks/-Kvm18rMzHPN4oGBRRpU.json';
    const json = JSON.stringify(menu);

    this.httpService.request('PUT', url, true, json)
    .then((data) => {
      console.log('PUT request sent successfully, received data', data);
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
}
