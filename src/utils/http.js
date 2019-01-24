import axios from 'axios'
import queryString from "@/utils/queryString.js"
var instance = axios.create({
  timeout: 20000,
  baseURL: 'http://10.0.6.83:8888',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // // 'X-Requested-With': 'XMLHttpRequest',\
    // 'accessToken': queryString("accessToken")
    // 'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IiU3QiUyMm5hbWUlMjIlM0ElMjIlRTQlQkIlOTglRTklOUQlOTIlRTklOUQlOTIlMjIlMkMlMjJwd2QlMjIlM0ElMjIxMTExMSUyMiUyQyUyMnR5cGUlMjIlM0ElMjIlRTUlQUQlQTYlRTUlOTElOTglMjIlN0Q9IiwiYmFzZTY0U2VjcmV0IjoidGVzdCIsImV4cGlyZXNTZWNvbmQiOjE1NDc5ODg0Njc5Mjl9.eJKfNOFxJL9aUNLn-7iYsWLQrjt71Id0jI8rfUWbJEg"
  },
})
instance.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem('token')) {
    //     config.headers.accessToken = store.stat\e.token
    // alert( window.sessionStorage.getItem('token'))
      config.headers.token = window.sessionStorage.getItem('token');
      // config.headers.accessToken = window.localStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if(error.message === 'Request failed with status code 401'){
      if(window.parent){
       
      }
    }
    return Promise.reject(error)
  }
)


export default instance
