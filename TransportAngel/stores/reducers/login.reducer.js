import {
  ADD_ISLOGIN,
  ADD_LOGIN_DATA,
  ADD_TO_DOWNLOAD_LIST,
  ADD_USER_TOKEN
} from '../actions/types'

const initialState = {
  isLogin: true,
  loginData: "",
  downloadData:[],
  userToken:""
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOGIN_DATA:
      return {
        ...state,
        loginData: action.data
      }
    case ADD_ISLOGIN:
      return {
        ...state,
        isLogin: action.data
      }
       case ADD_TO_DOWNLOAD_LIST:
         return{
           ...state,
           downloadData : action.data
         }
       case ADD_USER_TOKEN:
         return{
           ...state,
           userToken : action.data
         }
     
    default:
      return state
  }
}

export default loginReducer