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
  Button,
  Linking,
  StatusBar
} from 'react-native';
import Header from '../navigation/Header';
import Constant from '../Utils/Constant';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from "react-native-modal-loader";
import Fonts from '../Utils/Fonts';
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import { Card } from 'react-native-paper'

function Home({ navigation }) {

  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState('');
  const [filterAddressBrewery, setFilterAddressBrewery] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [form, setForm] = React.useState('');
  const [to, setTo] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [isAddVisible, setIsAddVisible] = React.useState(true);
  const [type, setType] = React.useState(true);
  const [result, setresult] = React.useState([])

  const OpenAddressModel = (type) => {
    removeEnityData()
    setType(type)
    setShowAddressModal(!showAddressModal)
    //  AddressApi("");
  }


  const removeEnityData = () => {
    setAddressData('')
    setFilterAddressBrewery('')
    setSearch('')

  }

  const onChangeAddressSearchText = (text) => {
    setSearch(text)

    AddressApi(text);
    // setSearch(text)
    // let fillterAddressArray = filterAddressBrewery;
    // let searchRsult = fillterAddressArray.filter(
    //   name => (name.description.toLowerCase()).includes(text.toLowerCase())
    // )
    // setAddressData(searchRsult)
  }

  const findapi = () => {
    const body = {
      from: form,
      to: to
    }
    axios.post(Constant.FINDROUTE, body)
      .then((response) => {
        console.log(response.data);
        setresult(response.data.data)
      })
      .catch((error) => console.log(error))
  }

  const AddressApi = async (text) => {
    //https://maps.googleapis.com/maps/api/place/autocomplete/json?input=chikhli&key=AIzaSyB8plKUyaWO5OXbzLcdViCzSnMFeRrCGqo
    setIsLoading(true);
    // setlistNotFound(false);
    fetch(Constant.URL_ADDRESS_API + text + "&" + "key" + "=" + "AIzaSyB8plKUyaWO5OXbzLcdViCzSnMFeRrCGqo", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {

        //alert(json.msg)
        console.log("-----------------Address Api------------------------------");
        console.log("Json", JSON.stringify(json));
        console.log("-----------------Addres sApi------------------------------");
        setAddressData(json.predictions)
        setFilterAddressBrewery(json.predictions)
        setIsLoading(false);

        //setResponse(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const SaveAddress = (name) => {
    if (!name.trim()) {
      alert('Please Enter Country');
      return;
    }

    if (type == "from") {
      setForm(name)
    } else if (type == "to") {
      setTo(name)
    }
    findapi()
    setShowAddressModal(!showAddressModal)
  }


  const makecall = (phone) => {
    var phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  const renderItemAddressData = ({ item }) => {
    setIsLoading(false)
    return (
      <View>
        <TouchableOpacity onPress={() => SaveAddress(item.description)}>
          <View style={{ margin: 15 }}>
            <View style={{ margin: 10, justifyContent: 'center' }}>
              <Text>{item.description}</Text>
            </View>
            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#33a89f',
              // backgroundColor: Constant.BORDER_COLOR,
            }}>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const rendervehicle = ({ item }) => {
    return (
      <>
        <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.LARGE }}>{item.vehicle_no}</Text>
      </>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <Animatable.View animation="fadeInUpBig"
      // style={{ margin: 10, borderRadius: 10, backgroundColor: Constant.palette.primary.light }}
      >
        <Card style={[{ margin: 10, borderRadius: 10, backgroundColor: Constant.palette.primary.light }, styles.shadow]}>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{item.user_data.fname} </Text>
              <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{item.user_data.lname}</Text>
            </View>
            {/* <FlatList
              data={item.vehicle_data}
              renderItem={rendervehicle}
            /> */}
            <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{item.vehicle_data.vehicle_no.toUpperCase()}</Text>
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
                  <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{item.from}</Text>
                  {/* <Text style={{ color: Constant.WHITE }}>{item.startDate}</Text> */}
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
                  <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{item.to}</Text>
                  {/* <Text style={{ color: Constant.WHITE }}>{item.endDate}</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}>{moment(item.date).format('DD-MM-YYYY')}</Text>
              <Text style={{ color: Constant.WHITE, fontSize: Fonts.FONTSIZE.MEDIUM }}> {moment(item.date).format('hh:mm a')}</Text>
              {/* <Text style={{ color: Constant.WHITE, fontSize: 25 }}>{item.price}</Text> */}
            </View>
            {/* <TouchableOpacity style={{ borderRadius: 25, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => makecall(item.user_data.phone)}>
              <Feather name='phone-call' color={'green'} size={20} />
            </TouchableOpacity> */}
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => makecall(item.user_data.phone)}
              style={[styles.FloatingActionButtonStyle, styles.shadow]}>
              <Feather name='phone-call' color={'white'} size={20}
                style={styles.FloatingActionButtonImageStyle} />
            </TouchableOpacity>
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return (
    <View style={{ flex: 2 }}>
      <StatusBar animated={true}
        backgroundColor={Constant.palette.primary.dark} />
      <Header isDrawer={true} title="Home" navigation={navigation} />
      <Loader loading={isLoading} color={Constant.palette.primary.light} />

      <View style={{ flex: 2, backgroundColor: Constant.palette.primary.light }}>
        <View style={{ flex: 0.4, justifyContent: 'center', backgroundColor: Constant.palette.primary.light }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => OpenAddressModel('from')}>
            <View style={{ margin: 5, padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: Constant.WHITE }}>
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                <Entypo
                  name="paper-plane"
                  color={Constant.palette.primary.light}
                  size={20}
                />
              </View>
              <Text style={{ color: Constant.palette.primary.light, fontSize: Fonts.FONTSIZE.MEDIUM }}>{form == '' ? 'select pickup location' : form}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => OpenAddressModel('to')}>
            <View style={{ margin: 5, padding: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: Constant.WHITE }}>
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                <Entypo
                  name="location"
                  color={Constant.palette.primary.light}
                  size={20}
                />
              </View>
              <View>
                <Text style={{ color: Constant.palette.primary.light, fontSize: Fonts.FONTSIZE.MEDIUM }}>{to == '' ? 'select drop location' : to}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>



        <View style={{ flex: 1.5, backgroundColor: Constant.WHITE }}>

          {/* <View style={{ flex: 3, backgroundColor: Constant.WHITE }}>
            <Text>
              mihir
            </Text>
          </View> */}

          <FlatList
            style={{ marginTop: 5 }}
            data={result}
            renderItem={renderItem}
          />
          <Button color={Constant.palette.primary.light} title='check' onPress={() => findapi()} />
        </View>
      </View>
      {/* Address Model */}
      <Modal
        style={{ flex: 1 }}
        animationType={'slide'}
        transparent={true}
        visible={showAddressModal}
        onRequestClose={() => {
          setShowAddressModal(!showAddressModal)
          console.log('Modal has been closed.');
        }}>
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <View style={{
          flex: 1,
          backgroundColor: Constant.WHITE,
          // borderRadius: 10,
          // borderWidth: 1,
          borderColor: Constant.SECONDARY_COLOR,
        }}>
          <SafeAreaView>
            <View style={{ padding: 15, backgroundColor: Constant.palette.primary.main, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setShowAddressModal(!showAddressModal)}>
                <FontAwesome5
                  size={15}
                  color={Constant.WHITE}
                  name={'arrow-left'}
                  style={{ alignItems: 'center', justifyContent: "center", marginTop: 3 }} solid />
              </TouchableOpacity>
              <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: Constant.WHITE,
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: "center"
              }}>
                Select your Address </Text>
            </View>
            <View>
              <Loader loading={isLoading} color={Constant.Color_Loader} />
            </View>
            <View style={{ flexDirection: 'row', marginRight: 15, marginLeft: 15, marginTop: 15 }}>
              <View style={{
                width: '100%',
                paddingLeft: 30,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 5,
              }}>

                <View style={{ flexDirection: 'row', }}>

                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                      style={{ fontSize: 16, }}
                      value={search}
                      // autoCapitalize="none"
                      autoCorrect={true}
                      // autoFocus={true}
                      color='black'
                      clearButtonMode="always"
                      placeholder="Select your Address"
                      placeholderTextColor={Constant.SECONDARY_COLOR}
                      onChangeText={(text) => { setSearch(text) }} />
                  </View>
                  <View style={{ justifyContent: 'center', margin: 5 }}>
                    <TouchableOpacity onPress={() => AddressApi()}>
                      <FontAwesome5 size={25} color={'black'} name={'search'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                {/* --------------------------------------------- */}
                {/* --------------------------------------------- */}
              </View>
            </View>
            {
              isAddVisible ? (
                search != '' ?
                  <TouchableOpacity onPress={() => { SaveAddress(search) }}>
                    <View style={{ margin: 15 }}>
                      <Text
                        style={{
                          padding: 7,
                          paddingLeft: 30,
                          fontSize: 16,
                          color: Constant.palette.primary.light
                        }}>{search}</Text>
                      <View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: Constant.palette.primary.light,
                      }}>
                      </View>
                    </View>
                  </TouchableOpacity>
                  :
                  null
              ) : null
            }
            <View>
              <FlatList
                data={addressData}
                renderItem={renderItemAddressData}
              />
            </View>

          </SafeAreaView>
        </View>
      </Modal>
      {/*Address Model */}




    </View>

  );
}

export default Home;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  FloatingActionButtonStyle: {
    position: 'absolute',
    width: 38,
    height: 38,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    right: 13,
    bottom: 13,
    // backgroundColor:'#23cf6d',
    backgroundColor: 'green',
    borderColor: '#000000',
    borderRadius: 200 / 2
  },
  FloatingActionButtonImageStyle: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingLeft: 4
    // resizeMode: 'contain',
    // tintColor:'#FFFFFF'
  },
})