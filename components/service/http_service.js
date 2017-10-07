(function() {
  'use strict';
  /** Service for HTTP communication */
  class HttpService {
    /**
     * Send HTTP GET request
     * @param {string} method HTTP request method (GET, POST, PUT etc)
     * @param {string} url URL for GET request
     * @param {boolean} async Asynchronous request
     * @param {string} data Data to be sent
     * @return {Promise} http response wrapped in Promise
     */
    static request(method, url, async = true, data = '') {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url, async); // 3d argument true-async, false-sync

        xhr.onload = (event) => {
          const resp = xhr.responseText; // request body
          const result = JSON.parse(resp);
          resolve(result);
        };

        xhr.onerror = (event) => {
          const resp = xhr.responseText; // request body
          const result = JSON.parse(resp);
          reject({message: result});
        };

        xhr.send(data);
      });
    }

    /**
     * Send HTTP GET request
     * @param {string} url URL for GET request
     * @return {Promise} http response wrapped in Promise
     */
    static get(url) {
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
    static post(url) {

    }

    /**
     * Send HTTP PUT request
     * @param {string} url URL for PUT request
     * @param {string} json Data to be transferred in JSON format
     * @return {Promise<string>} http response wrapped in Promise
     */
    static put(url, json) {
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
