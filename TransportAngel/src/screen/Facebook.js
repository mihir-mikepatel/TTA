// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { LoginManager, LoginButton, AccessToken, Profile, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk-next';
// import Header from '../navigation/Header';




// // Settings.setAppID('335287501699867');
// // Settings.initializeSDK();

// function Facebook() {

//   React.useEffect(() => {
//   }, [])


//   // Somewhere in your code
//   const signIn = async () => {

//     LoginManager.logInWithPermissions(["public_profile", 'email']).then(result => {
//       // console.log(result);

//       AccessToken.getCurrentAccessToken().then(
//         (data) => {
//           // console.log(data)
//           getInfoFromToken(data.accessToken)
//         }
//       )

//     });

//   };

//   function getInfoFromToken(token) {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id, name, first_name, last_name, birthday, email'
//       },
//     }
//     const profileRequest = new GraphRequest('/me', { token, parameters: PROFILE_REQUEST_PARAMS },
//       (error, result) => {
//         if (error) {
//           console.log('Login Info has an error:', error)
//         }

//         else {
//           if (result.isCancelled) {
//             console.log("Login cancelled");
//           }
//           if (result.email === undefined) {
//             Alert.alert("Error", "To contiune MyApp plase allow access to your email", "Ok")
//           }
//           else {
//             console.log(result)
//           }
//         }
//       },
//     )
//     new GraphRequestManager().addRequest(profileRequest).start()
//   }





//   // const sendInfoRequest = () => {

//   //   const infoRequest = new GraphRequest(
//   //     '/me?fields=name,email,picture.type(large)',
//   //     null,
//   //     _responseInfoCallback
//   //   );
//   //   new GraphRequestManager().addRequest(infoRequest).start();
//   // }

//   // const _responseInfoCallback = (error, result) => {
//   //   if (error) {
//   //     alert('Error fetching data: ' + error.toString());
//   //   } else {

//   //   }
//   // }


//   const isSignedIn = async () => {

//     Profile.getCurrentProfile().then(currentProfile => {
//       console.log(currentProfile);
//     }
//     )




//   };


//   const signOut = async () => {
//     LoginManager.logOut()
//   };

//   return (  <View style={{flex:1}}>
//      <Header isDrawer={false} title="Facebook" />

//     <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#fff" }}>

//       <LoginButton
//         onLoginFinished={
//           (error, result) => {
//             if (error) {
//               console.log("login has error: " + result.error);
//             } else if (result.isCancelled) {
//               console.log("login is cancelled.");
//             } else {
//               AccessToken.getCurrentAccessToken().then(
//                 (data) => {
//                   console.log(data.accessToken.toString())
//                 }
//               )
//             }
//           }
//         }
//         onLogoutFinished={() => console.log("logout.")} />

//       <Button
//         onPress={() => { signIn() }}
//         title="Sign In"
//         color="#841584"
//       />

//       <Button
//         onPress={() => { isSignedIn() }}
//         title="is Signed In"
//         color="#841584"
//       />

//       <Button
//         onPress={() => { signOut() }}
//         title="sign Out"
//         color="#841584"
//       />
//     </View>
//     </View>
//   );
// }

// export default Facebook;
