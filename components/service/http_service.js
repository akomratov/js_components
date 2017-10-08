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
}

// ------------------------------------------------------------
export {HttpService};
