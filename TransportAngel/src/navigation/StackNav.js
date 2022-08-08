// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createNativeStackNavigator } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from '../screen/SplashScreen';
import Home from '../screen/Home';

import SignUp from '../screen/SignUp';
import Login from '../screen/Login';
import MobileLogin from '../screen/MobileLogin';
import OtpScreen from '../screen/OtpScreen';
import DrawerNav from './DrawerNav';
import Language from '../screen/Language';
import Google from '../screen/Google';
import Facebook from '../screen/Facebook';
import Apple from '../screen/Apple';
import Register from '../screen/Register';
import VehicleRegister from '../screen/VehicleRegister';
import Vehicle from '../screen/Vehicle'
import Route from '../screen/Route';
import Routeadd from '../screen/Routeadd';
import Profileedit from '../screen/Profileedit';
import Setting from '../screen/Setting';

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName={'SplashScreen'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} />
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VehicleRegister" component={VehicleRegister} />
        <Stack.Screen name="MobileLogin" component={MobileLogin} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Google" component={Google} />
        <Stack.Screen name='Vehicle' component={Vehicle}/>
        <Stack.Screen name='Route' component={Route}/>
        <Stack.Screen name='Routeadd' component={Routeadd}/>
        <Stack.Screen name='Profileedit' component={Profileedit}/>
        <Stack.Screen name='Setting' component={Setting}/>
        {/* <Stack.Screen name='Setting' component={Vehicle}/> */}
        {/* <Stack.Screen name="Facebook" component={Facebook} /> */}
        {/* <Stack.Screen name="Apple" component={Apple} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackNav;