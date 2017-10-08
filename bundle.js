webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebars = __webpack_require__(1);

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class for Abstract Control to be extended by each component */
var AbstractControl = exports.AbstractControl = function () {
  /**
   * Create abstract control
   * @param {Object} param Object with parameters
   * @param {HTMLElement} param.el HTML element for control placement
   * @param {Object} param.data Data object binded to Control
   */
  function AbstractControl(_ref) {
    var el = _ref.el,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data;

    _classCallCheck(this, AbstractControl);

    this.$el = el;
    this.data = data;
    this.outdated = true;
    this.template = '<div class=".js-stub">stub</div>';
    this.te = _handlebars2.default;
  }

  /**
   * Marks control as outdated. Control will be rendered
   */


  _createClass(AbstractControl, [{
    key: 'setOutdated',
    value: function setOutdated() {
      this.outdated = true;
    }

    /**
     * Render control using template html
     */

  }, {
    key: 'render',
    value: function render() {
      if (this.outdated) {
        this.$el.innerHTML = this.te.compile(this.template)(this.data);
        this.outdated = false;
      }
    }
  }]);

  return AbstractControl;
}();

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = __webpack_require__(3);

var _form = __webpack_require__(5);

var _menu = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = {
  menuData: {},
  itemInput: {}
};

/** Class representing an Application, which combines all
  * the other artifacts.
  */

var App = function () {
  /**
   * Create Menu
   * @param {Object} param contains HTML element
   * @param {HTMLElement} param.el HTML element for new Menu
   */
  function App(_ref) {
    var el = _ref.el;

    _classCallCheck(this, App);

    // Create Menu control
    this.menu = new _menu.Menu({
      el: el.querySelector('.js-menu'),
      data: store
    });

    // Create Form control
    this.form = new _form.Form({
      el: el.querySelector('.js-form'),
      data: store
    });

    this.controls = [];
    this.controls.push(this.menu);
    this.controls.push(this.form);

    this._initEvents(el);

    this.controller = new _controller.Controller(store, this.controls);

    // Run Rendering cycle
    setInterval(this.render.bind(this), 50);
  }

  /**
   * Add event handlers common for nested components
   * @param {HTMLElement} el HTML element for event handling
   * @private
   */


  _createClass(App, [{
    key: '_initEvents',
    value: function _initEvents(el) {
      el.addEventListener('add_menu_item', this._onAddMenuItem.bind(this));
      el.addEventListener('remove_menu_item', this._onRemoveMenuItem.bind(this));
    }

    /**
     * Custom event 'add_menu_item' handler
     * @param {Event} event Custom event ('add_menu_item')
     * @private
     */

  }, {
    key: '_onAddMenuItem',
    value: function _onAddMenuItem(event) {
      this.controller.addMenuItem(event.detail.title);
      // this.form.setOutdated();
      // this.menu.setOutdated();
    }

    /**
     * Custom event 'remove_menu_item' handler
     * @param {Event} event Custom event ('remove_menu_item')
     * @private
     */

  }, {
    key: '_onRemoveMenuItem',
    value: function _onRemoveMenuItem(event) {
      this.controller.removeMenuItem(event.detail.index);
      // this.menu.setOutdated();
    }

    /**
     * Render all controls created in app.
     * Only outdated cotrols will be rendered.
     */

  }, {
    key: 'render',
    value: function render() {
      this.controls.forEach(function (control) {
        return control.render();
      });
    }
  }]);

  return App;
}();

window.App = App;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http_service = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var menuData = {
  title: 'Сохраненный список',
  items: []
};

var itemInput = {
  input: 'www.sap.com'
};

/** Main data manipulation class */

var Controller = exports.Controller = function () {
  /** Create application controller
   * @param {Object} store Application data store
   * @param {Array} controls Array of controls, which should be notified
   * regarding change
   */
  function Controller(store, controls) {
    _classCallCheck(this, Controller);

    this.httpService = _http_service.HttpService;

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


  _createClass(Controller, [{
    key: 'addMenuItem',
    value: function addMenuItem(title) {
      if (title !== '') {
        this.store.menuData.items.push({ title: title });
        this.store.itemInput.input = '';
        this.uploadMenuData(this.store.menuData);

        this._updateView();
      }
    }

    /**
     * Remove menu item from Menu by index
     * @param {number} index Index of menu item to be removed
     */

  }, {
    key: 'removeMenuItem',
    value: function removeMenuItem(index) {
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

  }, {
    key: '_updateView',
    value: function _updateView() {
      this.controls.forEach(function (control) {
        control.setOutdated();
      });
    }

    /**
     * Load Menu data via HTTP request
     */

  }, {
    key: 'loadMenuData',
    value: function loadMenuData() {
      var url = 'https://menudata-959fa.firebaseio.com/bookmarks/-Kvm18rMzHPN4oGBRRpU.json';
      var self = this;

      this.httpService.request('GET', url).then(function (data) {
        self.store.menuData.title = data.title;
        self.store.menuData.items = data.items;
        self._updateView.bind(self)();
      }).catch(function (error) {
        console.log('error', error);
      });
    }

    /**
     * Upload Menu data to backend system
     * @param {Object} menu Menu data to be uploaded
     */

  }, {
    key: 'uploadMenuData',
    value: function uploadMenuData(menu) {
      var url = 'https://menudata-959fa.firebaseio.com/bookmarks/-Kvm18rMzHPN4oGBRRpU.json';
      var json = JSON.stringify(menu);

      this.httpService.request('PUT', url, true, json).then(function (data) {
        console.log('PUT request sent successfully, received data', data);
      }).catch(function (error) {
        console.log('error', error);
      });
    }
  }]);

  return Controller;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Service for HTTP communication */
var HttpService = function () {
  function HttpService() {
    _classCallCheck(this, HttpService);
  }

  _createClass(HttpService, null, [{
    key: 'request',

    /**
     * Send HTTP GET request
     * @param {string} method HTTP request method (GET, POST, PUT etc)
     * @param {string} url URL for GET request
     * @param {boolean} async Asynchronous request
     * @param {string} data Data to be sent
     * @return {Promise} http response wrapped in Promise
     */
    value: function request(method, url) {
      var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, async); // 3d argument true-async, false-sync

        xhr.onload = function (event) {
          var resp = xhr.responseText; // request body
          var result = JSON.parse(resp);
          resolve(result);
        };

        xhr.onerror = function (event) {
          var resp = xhr.responseText; // request body
          var result = JSON.parse(resp);
          reject({ message: result });
        };

        xhr.send(data);
      });
    }
  }]);

  return HttpService;
}();

// ------------------------------------------------------------


exports.HttpService = HttpService;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract_control = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Class representing a Form. */
var Form = exports.Form = function (_AbstractControl) {
  _inherits(Form, _AbstractControl);

  /**
   * Create Form
   */
  function Form(_ref) {
    var el = _ref.el,
        data = _ref.data;

    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, { el: el, data: data }));

    _this.template = '<form><label>Site URL</label>\n                       <input type="text" class="js-input"\n                              value="{{this.itemInput.input}}"></input>\n                       <input type="submit"></input>\n                     </form>';
    _this._initEvents(el);
    return _this;
  }

  /**
   * Add form event handlers
   * @param {HTMLElement} el HTML element of form
   * @private
   */


  _createClass(Form, [{
    key: '_initEvents',
    value: function _initEvents(el) {
      el.addEventListener('submit', this._onSubmit.bind(this));
    }

    /**
     * On form submit handler
     * @param {Event} event Form submit event
     * @private
     */

  }, {
    key: '_onSubmit',
    value: function _onSubmit(event) {
      var val = this.$el.querySelector('input.js-input').value;
      this.data.input = val;
      var ev = new CustomEvent('add_menu_item', {
        bubbles: true,
        detail: { title: val }
      });
      this.$el.dispatchEvent(ev);
      event.preventDefault();
    }
  }]);

  return Form;
}(_abstract_control.AbstractControl);

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract_control = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Class representing a Menu. */
var Menu = exports.Menu = function (_AbstractControl) {
  _inherits(Menu, _AbstractControl);

  /**
   * Create Menu
   * @param {Object} param contains HTML element and Menu data
   * @param {HTMLElement} param.el HTML element for new Menu
   * @param {Array} param.data Menu data
   */
  function Menu(_ref) {
    var el = _ref.el,
        data = _ref.data;

    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, { el: el, data: data }));

    _this.template = '<div class=\'menu menu__title\'>\n                            {{menuData.title}}</div>\n                        <ul class=\'menu menu__list\'>\n                          {{#each menuData.items}}\n                            <li value=\'{{@index}}\'>{{this.title}}\n                                 <sup>x</sup></li>\n                          {{else}}\n                            <li>\u043D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439</li>\n                          {{/each}}\n                        </ul>';

    _this.initEvents();
    return _this;
  }

  /**
   * Init event handlers
   */


  _createClass(Menu, [{
    key: 'initEvents',
    value: function initEvents() {
      this.$el.addEventListener('click', this.toggleDisplayMenu.bind(this));
      this.$el.addEventListener('click', this.removeItem.bind(this));
    }

    /**
     * Open / close menu
     * @param {Event} ev DOM event
     */

  }, {
    key: 'toggleDisplayMenu',
    value: function toggleDisplayMenu(ev) {
      var currentItem = ev.target;

      if (currentItem.tagName == 'DIV') {
        this.$el.classList.toggle('_open');
      }
    }

    /**
     * Remove menu item (e.g. on button "Remove" click)
     * @param {Event} event DOM event
     */

  }, {
    key: 'removeItem',
    value: function removeItem(event) {
      var currentRemoveIcon = event.target;

      if (currentRemoveIcon.tagName == 'SUP') {
        var currentItem = currentRemoveIcon.closest('li');
        var itemIndex = currentItem.getAttribute('value');
        var ev = new CustomEvent('remove_menu_item', {
          bubbles: true,
          detail: { index: itemIndex }
        });
        this.$el.dispatchEvent(ev);
        event.preventDefault();
      }
    }
  }]);

  return Menu;
}(_abstract_control.AbstractControl);

/***/ })
],[2]);