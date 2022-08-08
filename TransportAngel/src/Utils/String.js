import * as React from 'react';


import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

const String = new LocalizedStrings({



  en: {
    login: 'Login ',
    email: 'Email',
    login_with_your_pn: 'Login with your phone number',
    login_with_your_email: 'Login with your email address',
    phone_verification :'Phone verification',
    enter_your_otp_code:'Enter your otp code',

    login_with_email:'Login with email',    
    login_with_pn:'Login with phone number',




    //------------------------------validtion-------------------------------//
    pe_valid_email: 'Please enter valid email'
    //------------------------------validtion-------------------------------//


  },

  "nr": {
    login: 'Logg Inn',
    email: 'E -post',
    login_with_your_pn: 'Logg inn med telefonnummeret ditt',
    login_with_your_email: 'Logg inn med din e -postadresse',
    phone_verification :'Telefonbekreftelse',
    enter_your_otp_code:'Skriv inn din otp -kode',


    login_with_email:'Logg inn med e -post',
    login_with_pn:'Logg inn med telefonnummer',



    //------------------------------validtion-------------------------------//
    pe_valid_email: 'Skriv inn gyldig e -postadresse'
    //------------------------------validtion-------------------------------//



  },


});

export default String;