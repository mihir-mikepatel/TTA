
// import * as React from 'react';


// import { View, Text,StatusBar,Button} from 'react-native';
// import Header from '../navigation/Header';
// import { appleAuth } from '@invertase/react-native-apple-authentication';


// function Apple({navigation}) {

//     async function onAppleButtonPress() {
//         // performs login request
//         const appleAuthRequestResponse = await appleAuth.performRequest({
//           requestedOperation: appleAuth.Operation.LOGIN,
//           requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//         });
      
//         console.log("Apple Auth Req =========>>>",appleAuthRequestResponse);
//       }
//     return (
//         <View style={{flex:1}}>
//           <Header isDrawer={false} title="Apple" />
//           <View>
        
//         <Button
//         onPress={() => { onAppleButtonPress() }}
//         title="Sign In"
//         color="#841584"
//       />
//       </View>
//       </View>
      
//     );
//   }
  
//   export default Apple;