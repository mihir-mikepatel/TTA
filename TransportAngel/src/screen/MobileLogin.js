import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    ScrollView,
    Dimensions
} from "react-native";
import axios from "axios";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Constant from "../Utils/Constant";
import LinearGradient from 'react-native-linear-gradient';
import String from "../Utils/String";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import fonts from '../Utils/Fonts'
const {height} = Dimensions.get('screen')


const MobileLogin = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const [code, setCode] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("")
    const screen = false

    const RequestEmailOtp = async () => {
        const body = {
            // "userid":userid,
            "email": email,
            // "otp":otp
        }
        const headers = {
            'Content-Type': 'application/json',
            "Accept": "*/*",
        }
        await axios.post(`${Constant.EMAILOTPREQ}`, body, { headers })
            .then((response) => {
                console.log('send email otp response', response.data);
                if (response.data.status === 1) {
                    navigation.replace('OtpScreen', { email: email, screen: 'emailotp', userid: response.data.data.userid })
                }
            })
            .catch((error) => console.log('requset email otp api error', error))
    }
    const RequestMobileOtp = async () => {
        const body = {
            "phone": formattedValue
        }
        const headers = {
            'Content-Type': 'application/json',
            "Accept": "*/*",
        }
        await axios.post(`${Constant.MOBILEOTPREQ}`, body, { headers })
            .then((response) => {
                console.log('send email otp response', response.data);
                if (response.data.status === 1) {
                    navigation.replace('OtpScreen',
                        { number: formattedValue, screen: 'mobileotp' })
                }
            })
            .catch((error) => console.log('requset mobile otp api error', error))
    }
    const setCountryCode = () => {

        if (!value.trim()) {
            alert('Please enter number')
            return;
        } else {
            console.log('Value', value);
            console.log('formattedValue', formattedValue);
            RequestMobileOtp()
            const text = reverseInPlace(formattedValue)
            console.log('intialState', text.slice(value.length));
            setCode(reverseInPlace(text.slice(value.length)))
            // navigation.replace('OtpScreen')
        }
    }
    function reverseInPlace(str) {
        var words = [];
        words = str.match(/\S+/g);
        var result = "";
        for (var i = 0; i < words.length; i++) {
            result += words[i].split('').reverse().join('') + " ";
        }
        return result
    }
    const checkEmailLogin = () => {
        //Check for the Name TextInput
        if (!email.trim()) {
            alert(String.pe_valid_email);
            return;
        }
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            alert(String.pe_valid_email);
            return;
        }
        RequestEmailOtp()
        // navigation.navigate('OtpScreen')
    };
    return (
        <>
        <ScrollView contentContainerStyle={{height:height}}>
                    <StatusBar animated={true}
                        backgroundColor={Constant.palette.primary.dark} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>{String.login}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: Constant.LOGIN }}>{isVisible ? 'Login with your email   ' : 'Login with your phone number'}</Text>
                    </View>
                    {
                        isVisible ?
                            <View style={styles.login_with_email_view}>
                                <MaterialCommunityIcons style={{ margin: 8 }} color={Constant.LOGIN} size={30} name={'email'} solid />
                                <TextInput
                                    placeholder={String.email}
                                    placeholderTextColor={Constant.BLACK}
                                    style={{ flex: 1 }}
                                    autoCapitalize="none"
                                    onChangeText={text => setEmail(text)}
                                    value={email}


                                />
                            </View>
                            :

                            <View style={styles.login_with_phone_view}>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={value}
                                    defaultCode="IN"
                                    layout="first"
                                    onChangeText={(text) => {
                                        setValue(text);
                                    }}
                                    onChangeFormattedText={(text) => {

                                        setFormattedValue(text);

                                    }}
                                />
                            </View>
                    }
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsVisible(!isVisible)
                            }}>
                            <Text style={{ color: Constant.LOGIN }} >{isVisible ? 'Login with phone number' : 'Login with your email'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                {
                                    if (isVisible) {
                                        checkEmailLogin()
                                    } else {
                                        var checkValid = phoneInput.current?.isValidNumber(value);
                                        setShowMessage(true);
                                        setValid(checkValid ? checkValid : false);
                                        setCountryCode()
                                    }
                                }
                            }}
                        >
                            <LinearGradient colors={[Constant.LOGIN, Constant.LOGIN]}
                                style={styles.login_button}>
                                <Text style={styles.login_button_text} >{String.login}</Text>
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
    container: {
        flex: 1,
        backgroundColor: Constant.WHITE
    },
    container_one: {
        flex: 1,
        backgroundColor: Constant.LOGIN
    },
    container_two: {
        backgroundColor: Constant.LOGIN,
        alignItems: 'center'
    },
    container_three: {
        marginTop: -50,
        width: '80%',
        backgroundColor: Constant.LOGIN
    },
    login_view: {
        backgroundColor: Constant.LOGIN,
        height: 200,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_text: {
        color: Constant.LOGIN,
        fontSize: 35,
        fontWeight: 'bold'
    },

    login_with: {
        color: Constant.WHITE,
        fontSize: 15,
        fontWeight: 'bold'
    },
    login_with_email_view: {
        alignItems: 'center',
        backgroundColor: Constant.WHITE,
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    login_with_phone_view: {
        marginTop: 10,
        alignItems: 'center'
    },
    login_with_pn: {
        color: Constant.WHITE,
        // paddingRight: 15,
        // paddingLeft: 15,
        // textAlign:'center',
        fontWeight: 'bold',
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
    scocial_media_button: {
        alignItems: 'center',
        marginBottom: 12,
        padding: 12,
        width: "100%"
    },
    google_button: {
        borderWidth: 2,
        borderColor: Constant.WHITE
    },
    google_button_lable: {
        color: Constant.WHITE,
        fontWeight: "bold"
    }, facebook_button: {
        marginTop: 8
    }, facebook_button_lable: {
        fontWeight: "bold"
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
export default MobileLogin;