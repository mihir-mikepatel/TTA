export default class Constant {

static App_Name = "Work On Demand"

static DOMAIN = "http://api.snow123.no/api/"
static WOD_DOMAIN = "http://api.workondemand.no/api/"

static DOMAIN1 = "http://192.168.0.106:5000/";
static MOBILEOTPREQ = Constant.DOMAIN1+"mobile/otp/request";
static EMAILOTPREQ = Constant.DOMAIN1+"email/otp/request";
static EMAILOTPVERFY = Constant.DOMAIN1+"users/email/otp/verify/register";
static MOBILEOTPVERFY = Constant.DOMAIN1+"users/mobile/otp/verify/register";
static VEHICLEREG = Constant.DOMAIN1+'vehicle/register';
static GETVEHICLE = Constant.DOMAIN1+'vehicle/myvehicle';
static DLTVEHICLE = Constant.DOMAIN1+'vehicle/demo/delete/';
static GETROUTE = Constant.DOMAIN1+'route/getroute';
static FINDROUTE = Constant.DOMAIN1+'route/find';
static ADDROUTE = Constant.DOMAIN1+'route/add';

static API_TOKEN = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODg3MGZlMS0xMWYyLTQ4MGEtYmNkYS1hOWYzNmNlMmE0OTMiLCJtb2JpbGVObyI6IjkyNjU5ODQzMTciLCJpc3MiOiJodHRwOi8vYXBpLnNub3cxMjMubm8iLCJhdWQiOiJodHRwOi8vYXBpLnNub3cxMjMubm8ifQ.PsWTGQbIYoCgd8Q1vUTS-GJLIV_ZGbDNVPkTrKZiQaQ"
//static URL_USER_REGISTRATION = Constant.DOMAIN + "Account/UserRegistration"

static URL_ADDRESS_API = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="

//Asyncs Storage Key Name
static AS_ISLOGIN = "isLogin"
static AS_EMAILID = "emailId"
static AS_USERNAME = "userName"
static AS_PASSWORD = "password"
static AS_SYSTEM_LANGUAGE = "systme_language"
static AS_ROLE = "role"
static AS_access_token = "access_token"
static AS_token_type = "token_type"
static AS_On_Notification = "onNotification"
static AS_USER_INFO = "UserInfo"
static LANGUAGE="Language"


// ROLE
static ROLE_customer = "customer"
static ROLE_company = "company"



//App Color
// static PRIMARY_COLOR = "#f7196e"const theme = createTheme({
static palette= {
    primary: {
      light: '#33a89f',
      main: '#009387',
      dark: '#00665e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
static PRIMARY_COLOR = "#009387"
static SECONDARY_COLOR = "gray"
static LOGIN = "#009387"
static WHITE = "white"
static BLACK = "black"
}


//https://www.flaticon.com/free-icon/moving_5363480?term=truck&page=1&position=94&page=1&position=94&related_id=5363480&origin=tag