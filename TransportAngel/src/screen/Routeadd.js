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
    Platform,
    Button,
    StatusBar
} from 'react-native';
import axios from 'axios';
import Header from '../navigation/Header';
import Constant from '../Utils/Constant';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from "react-native-modal-loader";
import Fonts from '../Utils/Fonts';
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from '../navigation/Dropdown';
import Moment from 'moment'
import moment from 'moment';
// import Entypo from 'react-native-vector-icons/Entypo'
// import { Button } from 'react-native-paper';



export default function Routeadd({ navigation }) {
    // const [date,setdate] = React.useState();
    const [showAddressModal, setShowAddressModal] = React.useState(false);
    const [addressData, setAddressData] = React.useState('');
    const [filterAddressBrewery, setFilterAddressBrewery] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const [form, setForm] = React.useState('');
    const [to, setTo] = React.useState('');
    const [date, setdate] = React.useState(new Date)
    const [sdate, setsdate] = React.useState()
    const [time, settime] = React.useState()
    const [mode, setmode] = React.useState('date')
    const [show, setshow] = React.useState(false)
    const [text, settext] = React.useState('Empty')
    const [vehicles, setvehicles] = React.useState([])
    const [vehicle_id, setvehicle_id] = React.useState('')
    const [search, setSearch] = React.useState('');
    const [isAddVisible, setIsAddVisible] = React.useState(true);
    const [type, setType] = React.useState(true);
    const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
    const [selecteditem, setselecteditem] = React.useState(null)

    const onSelect = (item) => {
        setselecteditem(item)
        console.log('add selected ', selecteditem);
    }

    const myvehicleapi = () => {
        const headers = {
            'authorization': userToken,
        }
        axios.get(Constant.GETVEHICLE, { headers })
            .then((response) => {
                console.log('myvehicle', response.data);
                if (response.data.message === 'your vehicle') {
                    console.log('here');
                    setvehicles(response.data.vehile)
                    console.log(vehicles);
                    // console.log('data', response.data.vehile);
                    // console.log('condition', !response.data.vehile.toString() == []);
                    // setvisible(false)
                }
            })
            .catch((error) => console.log(error))
    }

    const addrouteapi = () => {
        const headers = {
            'authorization': userToken,
        }
        const body = {
            from: form,
            to: to,
            date: date,
            vehicle_id: selecteditem._id,
        }
        console.log('body==>', body);
        axios.post(Constant.ADDROUTE, body, { headers })
            .then((response) => {
                console.log('myroute', response.data);
                if (response.data.status === 1) {
                    console.log('here');
                    console.log(response.data);
                    navigation.replace('Route')
                }
            })
            .catch((error) => console.log(error))

    }

    const onChange = (event, selectdate) => {
        const currentdate = selectdate || date;
        setshow(Platform.OS === 'ios');
        setdate(currentdate)
        console.log('date', moment(date).format('hh:mm a'));


        // const tempdate = new Date(currentdate);

        // let am_pm = 'AM';
        // let hours = tempdate.getHours()
        // if (tempdate.getHours() > 11) {
        // am_pm = 'PM';
        // if (hours > 12) {
        // hours = hours - 12;
        // }
        // }
        // 
        // if (hours == 0) {
        // hours = 12;
        // }
        // const selectedTime = `${hours}:${tempdate.getMinutes()} ${am_pm}`;
        //   this.setState({ selectedTime })
        // const fdate = (tempdate.getMonth() + 1) + '/' + tempdate.getDate() + '/' + tempdate.getFullYear();
        // let ftime = tempdate.getHours() + ':' + tempdate.getMinutes();
        // settext(fdate + '\n' + ftime)
        // console.log('selected value', selectedTime);
        // console.log(fdate + ' ' + ftime);
        // settext(fdate + ' ' + ftime)
        // setsdate(fdate)
        // settime(selectedTime)
    }

    const showmode = (currentdate) => {
        setshow(true);
        setmode(currentdate)
    }

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

        setShowAddressModal(!showAddressModal)
    }


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
                            backgroundColor: Constant.BORDER_COLOR,
                        }}>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    React.useEffect(() => {
        myvehicleapi()
    }, [])
    // console.log('text', text);

    const validation = () => {
        if (!form.trim()) {
            alert('please enter pickup point')
        } else {

            if (!to.trim()) {
                alert('please dropoff point')
            } 
            else
             {

                // if (!vehicles) 
                // {
                //     alert('please select vehicle')
                // }
                //  else {
                    
                    addrouteapi()
                // }
            }
        }
    }
    return (
        <>
            <View style={styles.container}>
                    <StatusBar animated={true}
                        backgroundColor={Constant.palette.primary.dark} />
                <Entypo style={{ padding: 10 }} name='cross' size={25} color='white' onPress={() => { navigation.goBack() }} />
                <View style={styles.header}><Text style={styles.text_header}>Add Your Route</Text></View>
                <View style={styles.footer}>
                    <View style={{
                        marginVertical: 5,
                    }}>
                        <Text>Select Pickup Point</Text>
                        <TouchableOpacity onPress={() => OpenAddressModel('from')}>
                            <View style={[styles.adresstextinput, { borderBottomWidth: 1 }]}>
                                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                                    <Entypo
                                        name="paper-plane"
                                        color={Constant.LOGIN}
                                        size={20}
                                    />
                                </View>
                                <Text style={{ color: Constant.LOGIN, fontSize: Fonts.FONTSIZE.MEDIUM }}>{form == '' ? 'select your pickup date' : form}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => OpenAddressModel('to')}>
                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text>Select Drop Point</Text>
                            <View style={[styles.adresstextinput, { borderBottomWidth: 1 }]}>
                                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                                    <Entypo
                                        name="location"
                                        color={Constant.LOGIN}
                                        size={20}
                                    />
                                </View>
                                <View>
                                    <Text style={{ color: Constant.LOGIN, fontSize: Fonts.FONTSIZE.MEDIUM }}>{to == '' ? 'select your pickup date' : to}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        marginVertical: 5,
                    }}>
                        <Text>Select Pickup Date</Text>
                        <TouchableOpacity
                            style={{ marginVertical: 5, borderBottomWidth: 1, height: 25 }}
                            onPress={() => showmode('date')}>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                            >
                                {date == 'Empty' ?
                                    <Text>select pickup date</Text>
                                    :
                                    <Text>{moment(date).format('YYYY-MM-DD')}</Text>
                                }
                                <Entypo name='calendar' size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <Text>{text}</Text> */}
                    <View style={{
                        marginVertical: 5,
                    }}>
                        <Text>Select Pick Up Time</Text>
                        <TouchableOpacity
                            style={{ marginVertical: 5, borderBottomWidth: 1, height: 25 }}
                            onPress={() => showmode('time')}>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                            >
                                {date == 'Empty' ?
                                    <Text>select pickup date</Text>
                                    :
                                    <Text>{moment(date).format('hh:mm a')}</Text>
                                }
                                <Entypo name='clock' size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        show && (
                            <DateTimePicker
                                testID='dateTimePicker'
                                value={date}
                                mode={mode}
                                minimumDate={new Date()}
                                // is24Hour={true}
                                display='default'
                                onChange={onChange}
                            />
                        )}
                    <View>

                    </View>
                    <View style={{}}>
                        <Text>Select Vehicle</Text>
                        <Dropdown
                            data={vehicles}
                            onSelect={onSelect}
                            value={selecteditem}
                        />
                    </View>
                    <View>
                    <View style={{ paddingBottom: 50, paddingTop: 30, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 }}>
                        <TouchableOpacity style={styles.touchbleDesign} onPress={() => { validation() }}>
                            <Text style={{ fontSize: Fonts.FONTSIZE.LARGE, textAlign: 'center' }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>


            <></>



            <Modal
                style={{ flex: 1 }}
                animationType={'slide'}
                transparent={true}
                visible={showAddressModal}
                onRequestClose={() => {
                    setShowAddressModal(!showAddressModal)
                    console.log('Modal has been closed.');
                }}>
                <View style={{
                    flex: 1,
                    backgroundColor: Constant.WHITE,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Constant.SECONDARY_COLOR,
                }}>
                    <SafeAreaView>
                        <View style={{ padding: 15, backgroundColor: Constant.PRIMARY_COLOR, flexDirection: 'row' }}>
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
                                            color='black'
                                            clearButtonMode="always"
                                            placeholder="Select your Address"
                                            placeholderTextColor={Constant.SECONDARY_COLOR}
                                            onChangeText={(text) => setSearch(text)} />
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
                                    <TouchableOpacity onPress={() => SaveAddress(search)}>
                                        <View style={{ margin: 15 }}>

                                            <Text
                                                style={{
                                                    padding: 7,
                                                    paddingLeft: 30,
                                                    fontSize: 16,
                                                    color: Constant.LOGIN
                                                }}>{search}</Text>

                                            <View style={{
                                                height: 1,
                                                width: '100%',
                                                backgroundColor: Constant.LOGIN,
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Constant.palette.primary.main
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center'
        paddingHorizontal: 20,
        // paddingBottom: 50
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    text_header: {
        paddingTop: 40,
        fontSize: Fonts.FONTSIZE.EXTRALARGE,
        color: '#FFFFFF'
    },
    icon: {
        position: 'absolute',
        marginTop: 10
    },
    dropdownstyle: {
        backgroundColor: `rgba(0,0,0,0.2)`,
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'center'
    },
    adresstextinput: {
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Constant.WHITE
    },
    touchbleDesign: {
        backgroundColor:  Constant.palette.primary.main,
        height: 52,
        width: '75%',
        // alignSelf: 'center',
        marginBottom: 80,
        borderRadius: 10,
        justifyContent: 'center',
        borderColor: Constant.palette.primary.main,
        borderWidth: 1,
        // flexDirection: 'row',
        // justifyContent: 'flex-start'
    },
})