import axios from 'axios';


export const COMMON_API = 'http://192.168.43.110:8000/api/';
export const DASHBOARD_API = 'http://192.168.43.110:8000/dashboard-api/';


class Api {
  constructor(dashboardApi = true) {
    if(dashboardApi)
      this.baseUrl =DASHBOARD_API;
    else
      this.baseUrl =COMMON_API;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getHeaders(add_auth_header) {
    const headers = {};
    const token = localStorage.getItem('access');
    if (add_auth_header && token != null)
      headers['Authorization'] = `Bearer  ${token}`;
    return headers;
  }

  async method(type, url, data, add_auth_header) {

    let option = {method: type, url};

    if (data) {
      option = {method: type, url, data};
    }

    let baseURL = this.getBaseUrl();
    let headers = this.getHeaders(add_auth_header);



    return  new Promise((resolve, reject) => {
      let result = axios.create({
        baseURL,
        timeout: 50000,
      }).request({
        ...option,
        headers,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken"
      });

      return result
        .then(resp => resolve(resp))
        .catch(err => {
          // if(err.code===401)
          //
          reject(err);
          // handleErrors(err);
        });
    });

  }

  post(url, data, add_auth_header) {
    return this.method('post', url, data, add_auth_header);
  }

  get(url, add_auth_header) {
    return this.method('get', url, null, add_auth_header);
  }

  put(url, data, add_auth_header) {
    return this.method('put', url, data, add_auth_header);
  }

  patch(url, data, add_auth_header) {
    return this.method('patch', url, data, add_auth_header);
  }

  delete(url, add_auth_header) {
    return this.method('delete', url, null, add_auth_header);
  }
}


export const getApi = (dashboardApi) => new Api(dashboardApi);

