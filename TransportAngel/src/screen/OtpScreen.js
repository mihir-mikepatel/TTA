import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    TextInput,
} from "react-native";
import Constant from "../Utils/Constant";
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Ionicons from 'react-native-vector-icons/Ionicons';
import String from "../Utils/String";
import { useDispatch, useSelector } from 'react-redux'
import { addIsLogin, addLoginData, addUserToken } from '../../stores/actions/login.action'
import fonts from '../Utils/Fonts'
const { height } = Dimensions.get('screen')

const OtpScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { isLogin, loginData, userToken } = useSelector(state => state.loginReducer)
    const [otpNumber, setOtpNumber] = React.useState("");
    const { screen, number, email, userid } = route.params
    const try1 = true
    console.log('screen', screen);
    console.log('number', number);
    console.log('userid', userid)

    const verfyapi = async (e) => {
        console.log('out');
        if (screen === 'mobileotp') {
            console.log('otpnumber', otpNumber);
            const body = {
                'phone': number,
                "otp": otpNumber
            }
            console.log(body);
            const headers = {
                'Content-Type': 'application/json',
                "Accept": "*/*",
            }
            axios.post(`${Constant.MOBILEOTPVERFY}`, body, { headers })
                .then((response) => {
                    console.log('mobile verify response', response.data);
                    if (response.data.status === 1 || response.data.status === 0) {
                        alert(response.data.message)
                    }
                    if (response.data.status === 2) {
                        dispatch(addLoginData(response.data.result.User))
                        dispatch(addUserToken(response.data.result.token))
                        dispatch(addIsLogin(false))
                        if (response.data.result.User.fname == undefined) {
                            navigation.replace('Register', { sphone: response.data.result.User.phone })
                        }
                        else {
                            navigation.replace('DrawerNav')
                        }
                    }
                })
                .catch((error) => console.log('error', error))
        }
        if (screen === 'emailotp') {
            const body = {
                "userid": userid,
                "otp": otpNumber,
                "email": email
            }
            const headers = {
                'Content-Type': 'application/json',
                "Accept": "*/*",
            }
            axios.post(`${Constant.EMAILOTPVERFY}`, body, { headers })
                .then((response) => {
                    console.log('Emial verify repsonse', response.data);
                    if (response.data.status === 2 || response.data.status === 0) {
                        alert(response.data.message)
                    }
                    if (response.data.status === 1) {
                        dispatch(addLoginData(response.data.result.User))
                        dispatch(addUserToken(response.data.result.token))
                        dispatch(addIsLogin(false))
                        if (response.data.result.User.fname == undefined) {
                            navigation.replace('Register', { semail: response.data.result.User.email })
                        }
                        else {
                            navigation.replace('DrawerNav')
                        }
                    }
                })
                .catch((error) => console.log(error))
        }
    }
    const autoFillOtp = (code) => {

        // alert(code)
        // setclearInput(false)
        setOtpNumber(code);

        console.log(`Code is ${code}, you are good to go!`)



    }


    return (
        <>
        <StatusBar animated={true}
            backgroundColor={Constant.palette.primary.dark} />
        <ScrollView contentContainerStyle={{height:height}}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MobileLogin')

                    }}>
                    <Ionicons
                        name="arrow-back"
                        color={Constant.WHITE}
                        size={30}
                    />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={{ color: Constant.WHITE, fontSize: fonts.FONTSIZE.LARGE }}>{String.phone_verification}</Text>
                    <Text style={{ color: Constant.WHITE, fontSize: fonts.FONTSIZE.LARGE }}>{String.enter_your_otp_code} .</Text>
                </View>
                <View style={styles.footer}>
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        <OTPInputView
                            style={styles.otp_input_view}
                            pinCount={4}
                            placeholderTextColor={Constant.WHITE}
                            autoFocusOnLoad={true}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            // clearInputs={clearInput}
                            onCodeFilled={(code => {
                                autoFillOtp(code)
                            })}
                        />
                        {/* <TextInput/> */}
                        {/* <TextInput/> */}
                        {/* <OTPInputView */}
                        {/* // pinCount={4} */}
                        {/* /> */}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { verfyapi() }}>
                            <LinearGradient colors={[Constant.LOGIN, Constant.LOGIN]}
                                style={styles.login_button}>
                                <Text style={styles.login_button_text}>{String.login}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container_one: {
        flex: 1, backgroundColor: Constant.LOGIN
    },
    container_two: {
        height: 200, backgroundColor: Constant.WHITE
    },
    container_three: {
        marginBottom: 20, marginLeft: 10, backgroundColor: Constant.WHITE, justifyContent: 'center',
    },
    phone_verification: {
        color: Constant.LOGIN, fontSize: 25, fontWeight: 'bold'
    },
    enter_your_otp_code: {
        color: Constant.LOGIN, fontSize: 15, fontWeight: 'bold'
    },
    container_four: {
        backgroundColor: Constant.LOGIN, alignItems: 'center'
    },
    otp_view: {
        marginTop: -50,
        width: '80%',
        backgroundColor: Constant.LOGIN
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    otp_input_view: {
        width: '60%',
        height: 80,
        justifyContent: 'center',
        // borderBottomWidth:1
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    login_button: {
        marginTop: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        borderColor: Constant.WHITE,
        borderWidth: 2
    },
    login_button_text: {
        color: Constant.WHITE,
        paddingRight: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
        paddingTop: 50,
        fontSize: fonts.FONTSIZE.EXTRALARGE,
        color: '#FFFFFF'
    },
});
export default OtpScreen;
