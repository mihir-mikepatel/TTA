import {
  ADD_ISLOGIN,
  ADD_LOGIN_DATA,
  ADD_TO_DOWNLOAD_LIST,
  ADD_USER_TOKEN

} from '../actions/types'


export const addLoginData = (data) => ({
  type: ADD_LOGIN_DATA,
  data: data
})

export const addIsLogin = (data) => ({
  type: ADD_ISLOGIN,
  data: data
})

 export const addDownload = (data) => ({
   type: ADD_TO_DOWNLOAD_LIST,
   data: data
 })
 export const addUserToken = (data) => ({
   type: ADD_USER_TOKEN,
   data: data
 })



