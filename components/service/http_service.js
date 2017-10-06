(function() {
  'use strict';
  /** Service for HTTP communication */
  class HttpService {
    /**
     * Create HTTP service
     */
    constructor() {

    }

    /**
     * Send HTTP GET request
     * @param {string} url URL for GET request
     * @return {Promise} http response wrapped in Promise
     */
    get(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true); // 3d argument true-async, false-sync

        xhr.onload = (event) => {
          const resp = xhr.responseText; // request body
          const data = JSON.parse(resp);
          resolve(data);
        };

        xhr.onerror = (event) => {
          const resp = xhr.responseText; // request body
          const data = JSON.parse(resp);
          console.log(resp, data);
          reject({message: data});
        };

        xhr.send();
      });
    }

    /**
     * Send HTTP POST request
     * @param {string} url URL for POST request
     */
    post(url) {

    }

    /**
     * Send HTTP PUT request
     * @param {string} url URL for PUT request
     * @param {string} json Data to be transferred in JSON format
     * @return {Promise} http response wrapped in Promise
     */
    put(url, json) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true); // 3d argument true-async, false-sync
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onload = (event) => {
          const resp = xhr.responseText; // request body
          const data = JSON.parse(resp);
          resolve(data);
        };

        xhr.onerror = (event) => {
          const resp = xhr.responseText; // request body
          const data = JSON.parse(resp);
          console.log(resp, data);
          reject({message: data});
        };

        xhr.send(json);
      });
    }
  }

  window.HttpService = HttpService;
})();
