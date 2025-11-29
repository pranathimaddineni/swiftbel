import axios from "axios";
// import  get  from 'lodash/get'
import { urlFor } from "./Urls"

export class NetworkOps {

  async getToken() {
    const token =  localStorage.getItem('token')
    // console.log(token,"token")
    // const session=token?JSON.parse(token):null
    // console.log(session,"token")

    return token ? ` ${token}` : ""
  }

  async setHeaders(options) {

  // const headerOverrides = get(options, "headerOverrides", {})

    const request = {
      headers: {
        'Access-Control-Allow-Origin': '*' ,
        "x-api-key": await this.getToken(),
        ...options,
      },
    }
    console.log(request,"request")
    return request
  }

  get = async (url,options) => {
    try {

      const config = await this.setHeaders(options)
      const res = await axios.get(urlFor(url), config)

      if (res.status === 200 || res.status === 201 || res.status === true) {
        return res.data
      }
      else {
        throw res.data
      }
    }
    catch (error) {
      const { response } = error

      const { ...errorObject } = response
      this.handleError(errorObject.data)
      return response
    }
  }

  handleError = async (response) => {
    if (response.status === 401 && response.message === 'Invalid token') {
    }
  }

  post = async (url, data, options) => {
    try {

      const config = await this.setHeaders(options)
      const res = await axios.post(urlFor(url), data, config)

      if (res.status === 200 || res.status === 201 || res.status === 204 || res.status === true) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {

      const { response } = error
      const { ...errorObject } = response // take everything but 'request'
      this.handleError(errorObject.data)
      return errorObject.data
    }

  }
  patch = async (url, data, options) => {
    try {

      const config = await this.setHeaders(options)
      const res = await axios.patch(urlFor(url), data, config)

      if (res.status === 200 || res.status === 201 || res.status === 204) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {

      const { response } = error
      const { request, ...errorObject } = response // take everything but 'request'
      this.handleError(errorObject.data)
      return errorObject.data
    }
  }

  put = async (url, data, options) => {
    try {

      const config = await this.setHeaders(options)
      const res = await axios.put(urlFor(url), data, config)
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {

      const { response } = error
      this.handleError(response)
      const { request, ...errorObject } = response
      return errorObject.data
    }
  }

  delete = async (url, datass, options) => {
    try {
      const res = await axios.delete(urlFor(url), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          "x-api-key": await this.getToken(),
        }
        , data: datass
      })

      if (res.status === 200 || res.status === 201 || res.status === 204 || res.status === true) {
        return res.data
      } else {
        throw res.data
      }
    } catch (error) {

      const { response } = error
      const { ...errorObject } = response // take everything but 'request'
      this.handleError(errorObject.data)
      return errorObject.data
    }

  }

}


export default new NetworkOps()

