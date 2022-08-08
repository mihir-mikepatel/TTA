import { DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  Alert,
  Linking
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { ScrollView } from 'react-native-gesture-handler';
import Constant from '../Utils/Constant';
import { useDispatch, useSelector } from 'react-redux'
import { addIsLogin, addLoginData, addUserToken } from '../../stores/actions/login.action'




const CustomDrawer = ({ navigation }) => {

  const dispatch = useDispatch()
  const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
  console.log(loginData);
  const signout = () => {
    dispatch(addLoginData([]))
    dispatch(addUserToken())
    dispatch(addIsLogin(true))
    navigation.replace("MobileLogin")
  }


  const Signoutalt = () => {
    Alert.alert('confirm', 'confirm do you want to sign out', [{ text: 'Yes', onPress: () => { signout() } }, { text: 'No' }])
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return unsubscribe;
  }, [navigation]);





  return (

    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>


        <ScrollView style={{ paddingTop: 16 }}>


          <View style={{ alignItems: "center", flexDirection: "row", width: "100%", paddingLeft: 8 }}>
            {/* <Image
                                style={{ height: 60, width: 60 }}
                                source={require('./../images/user.png')}
                                resizeMode="contain"
                            /> */}

            <View style={{ justifyContent: "center", paddingLeft: 8 }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
                {loginData.fname} {loginData.lname}
              </Text>
              <Text style={{ color: "#000" }}>{loginData.email}</Text>
            </View>
          </View>


          <View style={{ height: 20 }}></View>

          <DrawerItem label={"Home"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='home' />}
            onPress={() => {
              navigation.navigate('Home');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          />
          <DrawerItem label={"Profile"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <FontAwesome color={Constant.PRIMARY_COLOR} size={25} name='user' />}
            onPress={() => {
              navigation.navigate('Profileedit');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          />
          {/* <DrawerItem label={"Setting"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='settings-sharp' />}
            onPress={() => {
              navigation.navigate('Setting');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          /> */}
          <DrawerItem label={"Whatsapp"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <FontAwesome color={Constant.PRIMARY_COLOR} size={25} name='whatsapp' />}
            onPress={() => {Linking.openURL('whatsapp://send?phone=918488872044')}}
            style={styles.drawerItem}
          />
          <DrawerItem label={"Call Support"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='call-outline' />}
            onPress={() => {Linking.openURL(`tel:+91 8488872044`)}}
            style={styles.drawerItem}
          />
          {
            loginData.usertype == 'driver' ?
              <DrawerItem label={"Vehicle"}
                labelStyle={styles.itemLable}
                icon={({ focused, color, size }) => <FontAwesome color={Constant.PRIMARY_COLOR} size={25} name='truck' />}
                onPress={() => {
                  navigation.navigate('Vehicle');
                  // navigation.dispatch(DrawerActions.closeDrawer())
                }}
                style={styles.drawerItem}
              />
              :
              null}
          {
            loginData.usertype == 'driver' ?
              <DrawerItem label={'Route'}
                labelStyle={styles.itemLable}
                icon={({ focused, color, size }) => <FontAwesome5 color={Constant.PRIMARY_COLOR} size={25} name='route' />}
                onPress={() => {
                  navigation.navigate('Route')
                }}
              />
              : null
          }
          {/* <DrawerItem label={"Language"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='settings-sharp' />}
            onPress={() => {
              navigation.navigate('Language');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          /> */}
          <DrawerItem label={"Google"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <AntDesign color={Constant.PRIMARY_COLOR} size={25} name='google' />}
            onPress={() => {
              navigation.navigate('Google');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          />

          {/* <DrawerItem label={"Facebook"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='settings-sharp' />}
            onPress={() => {
              navigation.navigate('Facebook');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          /> */}
{/* 
          <DrawerItem label={"Apple"}
            labelStyle={styles.itemLable}
            icon={({ focused, color, size }) => <Ionicons color={Constant.PRIMARY_COLOR} size={25} name='settings-sharp' />}
            onPress={() => {
              navigation.navigate('Apple');
              // navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={styles.drawerItem}
          /> */}

        </ScrollView>

        <View style={{ bottom: 0, margin: 10 }}>

          <DrawerItem label={"Sign Out"} labelStyle={{ color: Constant.PRIMARY_COLOR, fontSize: 18 }} icon={() => (<FontAwesome name="sign-out" color={Constant.PRIMARY_COLOR} size={22} />)}
            onPr onPress={() => { Signoutalt() }} />
          {/* :
                        <DrawerItem label={"Sign In"} labelStyle={{ color: Constant.PRIMARY_COLOR, fontSize: 18 }} icon={() => (<FontAwesome name="sign-in" color={Constant.PRIMARY_COLOR} size={22} />)}
                            onPress={() => { navigation.navigate("SignIn") }} />
                    */}
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerItem: {
    //backgroundColor: Global.secondaryColor
  },
  itemLable: {
    fontSize: 16,
    color: Constant.PRIMARY_COLOR,
  }
});

export default CustomDrawer;

