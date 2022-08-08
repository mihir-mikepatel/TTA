import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  StatusBar
} from 'react-native';
import Header from '../navigation/Header';
import Constant from '../Utils/Constant';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from "react-native-modal-loader";
import Fonts from '../Utils/Fonts';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Card } from 'react-native-paper';
import moment from 'moment';

export default function Addroute({ navigation }) {
  const [routes, setroutes] = React.useState()
  const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)


  const routesapi = () => {
    const headers = {
      'authorization': userToken,
    }
    axios.get(Constant.GETROUTE, { headers })
      .then((response) => {
        console.log(response.data);
        setroutes(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  const rendervehicle = ({ item }) => {
    return (
      <>
        <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.LARGE }}>{item.vehicle_no}</Text>
      </>
    )
  }

  const renderroutes = ({ item }) => {
    let text = item.date;
    const myArray = text.split("T");

    console.log(myArray[0]);
    return (
      <Animatable.View animation="fadeInUpBig" style={{}}>
        <Card style={[{ margin: 10, borderRadius: 10, backgroundColor:Constant.palette.primary.light },styles.shadow]}>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{moment(item.date).format('DD-MM-YYYY')}</Text>
            <Text style={{ color: Constant.WHITE, fontSize:Fonts.FONTSIZE.MEDIUM}}>{item.vehicle_data.vehicle_no.toUpperCase()}</Text>
          </View>
          <View>
            <View style={{ margin: 20, justifyContent: 'center' }}>
              <View style={{ margin: 5, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                  <Entypo
                    name="paper-plane"
                    color={Constant.WHITE}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={{ color: Constant.WHITE, fontSize:Fonts.FONTSIZE.MEDIUM}}>{item.from}</Text>
                </View>
              </View>
              <View style={{ margin: 5, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                  <Entypo
                    name="location"
                    color={Constant.WHITE}
                    size={20}
                  />
                </View>
                <View>
                  <Text style={{ color: Constant.WHITE, fontSize:Fonts.FONTSIZE.MEDIUM }}>{item.to}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>Pickup Time: {moment(item.date).format('hh:mm A')}</Text>
          </View>
        </Card>
      </Animatable.View>
    )
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      routesapi()
    });
    return unsubscribe;

  }, [])

  return (
    <>
    <StatusBar animated={true}
        backgroundColor={Constant.palette.primary.dark} />
      <Header isDrawer={false} title="Your Route" rbutton={true} navigation={navigation} />
      <View style={{ flex: 1.5, backgroundColor: Constant.WHITE }}>
        <FlatList
          data={routes}
          renderItem={renderroutes}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  }
})