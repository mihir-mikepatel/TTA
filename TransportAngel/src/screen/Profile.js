import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { View, Text, StatusBar ,StyleSheet} from 'react-native';
import Header from '../navigation/Header';
import Constant from '../Utils/Constant';

function Profile({ navigation }) {
  const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)

  const myvehicleapi = () => {
    const headers = {
      'authorization': userToken,
    }
    axios.get('http://192.168.151.227:5000/vehicle/myvehicle', { headers })
      .then((response) => {
        console.log('myvehicle', response.data);
        if (response.data.message === 'your vehicle') {
          console.log('here');
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    // myvehicleapi()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true}
        backgroundColor={Constant.palette.primary.dark} />
      <Header isDrawer={true} title="Profile" navigation={navigation} ebutton={true} />
      <View style={{ flex: 1, padding: 15 }}>
        <View style={[{flexDirection:'row'},styles.view]}>
          <View style={{ width: '50%' }}>
            <Text>First Name:</Text>
            <Text>{loginData.fname}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text>Last Name:</Text>
            <Text>{loginData.lname}</Text>
          </View>
        </View>
        <View style={styles.view}>
          <Text>Email:</Text>
          <Text>{loginData.email}</Text>
        </View>
        <View style={styles.view}>
          <Text>Phone Number:</Text>
          <Text>{loginData.phone}</Text>
        </View>  
        <View style={styles.view}>
          <Text>City:</Text>
          <Text>{loginData.city}</Text>
        </View>
        <View style={styles.view}>
          <Text>User Type:</Text>
          <Text>{loginData.usertype}</Text>
        </View>
      </View>
    </View>

  );
}

export default Profile;

const styles = StyleSheet.create({
  view:{
margin:10
  }
})