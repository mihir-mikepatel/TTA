import * as React from 'react';
import { Platform, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screen/Home';
import Setting from '../screen/Setting';
import Profile from '../screen/Profile';
import Constant from '../Utils/Constant';
import HomeOne from '../screen/HomeOne'
import Fonts from '../Utils/Fonts';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (

        <Tab.Navigator
        // barStyle={{ backgroundColor: 'red' }}
        // sceneContainerStyle={{backgroundColor:'red'}}
            screenOptions={({ route ,}) => ({
                // headerBackgroundContainerStyle: ({color})=>{{color:'white'}},
                tabBarIcon: ({ focused, color, size }) => {

                    size = 26
                    if (route.name === 'Home') {
                        return <Ionicons name="home" size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        return <FontAwesome name="user" size={size} color={color} />;
                    } else if (route.name === 'Setting') {
                        return <Ionicons color={color} size={size + 2} name='settings-sharp' />;
                    }
                    // } else if (route.name === 'Visa') {
                    //     return <FontAwesome name="plane" size={size + 2} color={color} />;
                    // } else if (route.name === 'Settings') {
                    //     return <Ionicons name="settings-sharp" size={size} color={color} />;
                    // }
                    return <Ionicons name="home" size={size} color={color} />;

                },
                headerShown:false
            })}
            tabBarOptions={{
                activeTintColor: Constant.PRIMARY_COLOR,
                inactiveTintColor: '#696969',
                labelStyle: { fontSize:Fonts.FONTSIZE.MINI},
                tabStyle: {},
                style: Platform.OS == "ios" ? {} : { paddingTop: 4, height: 52 },
            }}
        >
            {/* <Tab.Screen name="Home" screenOptions={{headerShown: false}} component={Home} /> */}
            {/* <Tab.Screen name="Home" screenOptions={{headerShown: false}} component={HomeOne} /> */}
            {/* <Tab.Screen name="Profile" screenOptions={{headerShown: false}} component={Profile} /> */}
            {/* <Tab.Screen name="Setting" screenOptions={{headerShown: false}} component={Setting} /> */}

            
        </Tab.Navigator>
    );
}
