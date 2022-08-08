import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Alert,
    StatusBar
} from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Fonts from '../Utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import Header from '../navigation/Header'
import { Card } from 'react-native-paper'
import fonts from '../Utils/Fonts'
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler'
import Constant from '../Utils/Constant'
const { height } = Dimensions.get('screen')


export default function Vehicle({ navigation }) {
    const [vehicle_no, setvehicle_no] = useState()
    const [chassis_no, setchassis_no] = useState()
    const [owner_name, setowner_name] = useState()
    const [visible, setvisible] = useState()
    const [add, setadd] = useState()
    const [vehicles, setvehicles] = useState([])
    const screen = false
    const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
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
                    console.log('data', response.data.vehile);
                    console.log('condition', !response.data.vehile.toString() == []);
                    setvisible(false)
                }
            })
            .catch((error) => console.log(error))
    }

    const vehicleapi = () => {
        const headers = {
            'authorization': userToken,
        }
        const body = {
            vehicle_no: vehicle_no,
            chassis_no: chassis_no,
            owner_name: owner_name,

        }
        axios.post(Constant.VEHICLEREG, body, { headers })
            .then((response) => {
                console.log('register vehicle', response.data);
            })
            .catch((error) => console.log(error))
    }

    const cnfmdltalt = (id) => {
        Alert.alert('confirm', "confirm do you want to delete ?", [{ text: 'yes', onPress: () => { deleteapi(id) } }, { text: 'cancel', onPress: () => { } }])
    }
    // const deleteapi= () =>{
    //     axios.get(`http://192.168.151.227:5000/vehicle/delete/${}`)
    //     .then((response) => {
    //         console.log();
    //     })
    // }

    const deleteapi = async (id) => {
        await axios.delete(`${Constant.DLTVEHICLE}${id}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.status == 1) {
                    Alert.alert('delete', 'your vehicle deatil deleted', [{ text: 'ok', onPress: () => { myvehicleapi(), setvisible(true) } }])
                }
            })
            .catch((error) => console.log(error))
    }

    const fatchroute = async (id) => {
        console.log(id);
        await axios.get(`http://192.168.0.150:5000/route/getroute/data/${id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            myvehicleapi()
            setvisible(true)
            setadd(true)
        });
        return unsubscribe;
    }, [])

    const fatchvehicles = ({ item, index }) => {
        return (
            <Animatable.View animation="fadeInUpBig">
                <Card style={[{ margin: 10, borderRadius: 10, backgroundColor: Constant.palette.primary.light }, styles.shadow]} onPress={() => fatchroute(item._id)}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '90%', padding: 5 }}>
                            <Text style={{ marginBottom: 10, fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>No:{index + 1}</Text>
                            <View style={styles.card_view}>
                                <Text style={{ width: '45%', fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>vehicle number</Text>
                                <Text style={{ fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>: {item.vehicle_no.toUpperCase()}</Text>
                            </View>
                            <View style={styles.card_view}>
                                <Text style={{ width: '45%', fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>owner name</Text>
                                <Text style={{ fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>: {item.owner_name}</Text>
                            </View>
                            <View style={styles.card_view}>
                                <Text style={{ width: '45%', fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>chassis number</Text>
                                <Text style={{ fontSize: fonts.FONTSIZE.MEDIUM, color: 'white' }}>: {item.chassis_no}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 5 }}>
                            <TouchableOpacity onPress={() => cnfmdltalt(item._id)}>
                                <MaterialIcons color={'white'} name='delete-outline' size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </Animatable.View>
        )
    }

    return (
        <>
            {visible ?
                <View style={{ flex: 1 }}>
                    <StatusBar animated={true}
                        backgroundColor={Constant.palette.primary.dark} />
                    <Header isDrawer={false} title="Vehicle" button={true} navigation={navigation} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={50} />
                    </View>
                </View>
                :
                <>
                    <StatusBar
                        animated={true}
                        backgroundColor={Constant.palette.primary.dark}
                    // barStyle={statusBarStyle}
                    // showHideTransition={statusBarTransition}
                    />
                    <Header isDrawer={false} title="Vehicle" button={true} navigation={navigation}><Text style={{ color: 'black', fontSize: fonts.FONTSIZE.LARGE }}>hello</Text></Header>
                    {
                        !vehicles.toString() == [] ?

                            <View style={{ marginBottom: 60 }}>
                                <FlatList
                                    data={vehicles}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={fatchvehicles}
                                    extraData={true}
                                />

                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: 'black', fontSize: fonts.FONTSIZE.LARGE }}>No Record Found</Text>
                            </View>
                    }
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    textinput: {
        borderBottomWidth: 1,
        color: 'black'
    },
    view: {
        marginVertical: 10,
        // marginHorizontal: 15
    },
    text: {
        fontSize: Fonts.FONTSIZE.MEDIUM
    },
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
    container: {
        flex: 1,
        // backgroundColor: '#009387'
        backgroundColor: Constant.palette.primary.main
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems:'center'
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    text_header: {
        paddingTop: 40,
        fontSize: fonts.FONTSIZE.EXTRALARGE,
        color: '#FFFFFF'
    },
    card_view: {
        flexDirection: 'row',
        margin: 2
    },
})