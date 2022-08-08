import * as React from 'react';
import { Button, View } from 'react-native';
// import Profile from '../screen/Profile';
// import Setting from '../screen/Setting';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNav from './BottomNav';
import CustomDrawer from './CustomDrawer';
import Profile from '../screen/Profile';
import Home from '../screen/HomeOne';
import Vehicle from '../screen/Vehicle';
import Route from '../screen/Route';
import Setting from '../screen/Setting';
import Google from '../screen/Google';

const Drawer = createDrawerNavigator()

function DrawerNav() {
    return (

        <Drawer.Navigator
        initialRouteName="BottomNav"
        screenOptions={{ headerShown: false }} 
        drawerContent={(props) => <CustomDrawer {...props} />}
    >
        {/* <Drawer.Screen name="BottomNav" component={BottomNav} /> */}
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
    </ Drawer.Navigator>
    );
}
export default DrawerNav;