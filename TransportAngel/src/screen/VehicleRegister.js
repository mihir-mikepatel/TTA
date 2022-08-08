import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
    StatusBar,
    Image,
    PixelRatio
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import fonts from '../Utils/Fonts'
import Fonts from '../Utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import Constant from '../Utils/Constant'
import vno from '../image/310703.png'
import vch from '../image/automotive.webp'
import Ionicons from 'react-native-vector-icons/Ionicons'


const { height } = Dimensions.get('screen')
// const OtpScreen = ({ navigation, route }) => {
function VehicleRegister({ navigation }) {
    // console.log(navigation);
    const [vehicle_no, setvehicle_no] = useState('')
    const [chassis_no, setchassis_no] = useState('')
    const [owner_name, setowner_name] = useState('')
    const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
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
                if (response.data.message == 'vehicle already register') {
                    Alert.alert('alert', response.data.message, [{ text: 'Ok', onPress: () => console.log("cancel pressed") }])
                }
                else {
                    Alert.alert('alert', response.data.message, [{ text: 'ok', onPress: () => navigation.navigate('VehicleRegister') }])
                }
            })
            .catch((error) => console.log(error))
    }

    const validation = () => {
        if (!vehicle_no.trim()) {
            alert('please enter vehicle no')
        } else {

            if (!chassis_no.trim()) {
                alert('please enter chassis no')
            } else {
                if (!owner_name.trim()) {
                    alert('please enter owner name')
                } else {
                    vehicleapi()
                }
            }
        }
    }

    return (
        // <ScrollView contentContainerStyle={{ height: height }}>
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Constant.palette.primary.dark} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '10%', margin: 15 }}>
                <Entypo name='cross' size={25} color='white' />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.text_header}>Vehicle Register</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.view}>
                    <Text style={styles.text}>Vehicle Number:</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={vno} style={{ height: PixelRatio.getPixelSizeForLayoutSize(12), width: PixelRatio.getPixelSizeForLayoutSize(12), position: 'absolute', marginTop: 10 }} />
                        <TextInput style={styles.textinput} autoCapitalize='characters' keyboardType={'ascii-capable'} placeholder='Vehicle No' onChangeText={(text) => setvehicle_no(text)} />
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Chassis No:</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={vch} style={{ height: PixelRatio.getPixelSizeForLayoutSize(12), width: PixelRatio.getPixelSizeForLayoutSize(12), position: 'absolute', marginTop: 10 }} />
                        <TextInput style={styles.textinput} placeholder='Chassis No' onChangeText={(text) => setchassis_no(text)} />
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Owner Name:</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Ionicons name='person' size={20} style={{ position: 'absolute', marginTop: 10 }} />
                        <TextInput style={styles.textinput} placeholder='Owner Name' onChangeText={(text) => setowner_name(text)} />
                    </View>
                </View>
                <View style={{ paddingBottom: 50, paddingTop: 30, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 }}>
                        <TouchableOpacity style={styles.touchbleDesign} onPress={() => { validation() }}>
                            <Text style={{ fontSize: fonts.FONTSIZE.LARGE, textAlign: 'center' }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
        // {/* </ScrollView> */}
    )

}
export default VehicleRegister;

const styles = StyleSheet.create({
    textinput: {
        borderBottomWidth: 1,
        // borderWidth:1,
        color: 'black',
        height: 40,
        paddingHorizontal: 27
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
        backgroundColor: Constant.palette.primary.main
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center'
        paddingHorizontal: 20,
        // paddingBottom: 50
    },
    footer: {
        flex: 7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    text_header: {
        // paddingTop: 40,
        fontSize: fonts.FONTSIZE.EXTRALARGE,
        color: '#FFFFFF'
    },
    card_view: {
        flexDirection: 'row'
    },
    touchableOpacity: {
        backgroundColor: 'blue',
        width: '48%',
        alignItems: 'center',
        borderRadius: 25,
        height: '100%',
        // paddingVertical:
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