import React,{useState} from 'react';
import { Provider, Modal, Portal } from 'react-native-paper'
import { View, Text, StatusBar ,ScrollView,TouchableOpacity,StyleSheet} from 'react-native';
import Header from '../navigation/Header';
import Constant from '../Utils/Constant';
import Fonts from '../Utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useSelector,useDispatch} from 'react-redux'

function Setting({ navigation }) {
  const [current, setCurrent] = useState()
  const { isLogin } = useSelector(state => state.loginReducer)
  const dispatch = useDispatch()
  const [visible, setvisible] = useState(false)
  const showModal = () => setvisible(true)
  const hideModal = () => setvisible(false)

  const Logout = () => {
    console.log('here is the valu of islogin', { isLogin })

    //   const logout = () => {
    dispatch(addIsLogin(true))
    console.log('here is the valu of islogin', { isLogin })
    navigation.replace('Login')
    //   }
  }


  return (
    <>
    <Header title={'Setting'} navigation={navigation} isDrawer={true}/>
    </>
    // <ScrollView contentContainerStyle={{ flex: 1 }}
    // // style={{ flex: 1, backgroundColor: '#e8e8e8' }}
    // >
    //   <Header title={'Setting'} />
    //   <View style={styles.mainview}>
    //     <Text style={styles.maintext}>Account</Text>
    //     <View style={styles.maintextview}>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Address</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Telephone</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Email</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    //   <View style={styles.mainview}>
    //     <Text style={styles.maintext}>Setting</Text>
    //     <View style={styles.maintextview}>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Order Notifications</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Discount Notifications</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.textview}>
    //         <TouchableOpacity style={styles.touchablestyle}>
    //           <Text style={styles.text}>Credit Card</Text>
    //           <MaterialIcons color='black' name='arrow-forward-ios' />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    //   <View style={styles.mainview}>
    //     <TouchableOpacity onPress={showModal}>
    //       <Text style={styles.maintext}>Logout</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <Provider>
    //     <Portal>
    //       <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
    //         <Text style={{ color: 'black', marginLeft: 5, fontSize: Fonts.FONTSIZE.LARGE }}>confirm</Text>
    //         <Text style={{ color: 'black', marginLeft: 5 }}>are you sure want to Logout?</Text>
    //         <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
    //           <TouchableOpacity onPress={hideModal}><Text style={{ color: 'red', marginLeft: 5 }} >Close</Text></TouchableOpacity>
    //           <TouchableOpacity onPress={Logout}><Text style={{ color: 'red', marginLeft: 5 }} >Logout</Text></TouchableOpacity>
    //         </View>
    //       </Modal>
    //     </Portal>
    //   </Provider>

    // </ScrollView>

  );
}

export default Setting;


const styles = StyleSheet.create({
  scrollstyle: {

  },
  mainview: {
    backgroundColor: 'white',
    padding: 5,
    margin: 5
  },
  textview: {
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  maintextview: {
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    marginTop: 10
  },
  maintext: {
    color: 'black',
    fontSize: Fonts.FONTSIZE.LARGE
  },
  text: {
    color: 'black',
    fontSize: Fonts.FONTSIZE.MEDIUM,
    margin: 5
  },
  touchablestyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }

})