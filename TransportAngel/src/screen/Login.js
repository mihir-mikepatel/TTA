
import * as React from 'react';


import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import Constant from '../Utils/Constant';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Login({ navigation }) {


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const checkLogin = () => {
        //Check for the Name TextInput
        if (!email.trim()) {
            alert('Please Enter valid Email');
            return;
        }

        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            alert('Please Enter valid Email');

            return;
        }

        if (!password.trim()) {
            alert('Please Enter valid password');
            return;
        }

       navigation.navigate('Home')

    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar animated={true}
            backgroundColor={Constant.palette.primary.dark} />
            <SafeAreaView style={{flex: 1,   }}>
                <ScrollView>
             
                <View style={{ margin: 5 }}>

                <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>

                            <Ionicons
                                name="arrow-back"
                                color={Constant.LOGIN}
                                size={30}
                            />

                        </View>
                    </TouchableOpacity>

                    <View style={{ margin: 10 }}>
                        <Image source={require('../image/moving.png')}>
                        </Image>
                    </View>

                    <View style={{ margin: 10 }}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 25, color: 'black' }}>Process with your</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Login</Text>
                        </View>
                    </View>
                </View>

                <View style={{  margin: 5 }}>
                
                    <View style={{ marginRight: 15, marginLeft: 15 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 18,
                        }}>Email</Text>

                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }}>


                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: 'black'
                                }]}
                                autoCapitalize="none"
                                onChangeText={text => setEmail(text)}
                                value={email}


                            />

                            <Fontisto
                                name="email"
                                color={'gray'}
                                size={20}
                            />
                        </View>
                    </View>

                    <View style={{ marginRight: 15, marginLeft: 15, marginTop: 10 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 18,
                        }}>Password</Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }}>


                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: 'black'
                                }]}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text => setPassword(text)}
                                value={password}
                            />
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        </View>

                    </View>

                    <View style={{ margin: 25 }}>
                        <TouchableOpacity onPress={() =>checkLogin()}>
                            <LinearGradient colors={[Constant.LOGIN, Constant.LOGIN]}
                                style={{
                                    padding: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    flexDirection: 'row',
                                    borderColor: 'white',
                                    borderWidth: 2
                                }}>

                                <Text style={{
                                    color: 'white',
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    fontWeight: 'bold'
                                }} >Login</Text>

                            </LinearGradient>
                        </TouchableOpacity>
                  
                        <TouchableOpacity onPress={() =>navigation.navigate('SignUp')}>
                      <View style={{alignItems:'center',margin:5}}>
                        <Text style={{
                            color: '#05375a',
                            fontSize: 18,
                        }}>Sign Up</Text>
                  </View>
                  </TouchableOpacity>

                  <View style={{ marginBottom: 12, padding: 12, width: "100%" }}>
                                <Button style={{backgroundColor:Constant.WHITE,}} icon={() => (<Image
                                    style={{ height: 22, width: 22 ,}}
                                    source={require('../image/google.png')}
                                    resizeMode="contain"
                                />)} mode="contained" 
                                // style={{ borderWidth: 2 }} 
                                labelStyle={{ color: "#696969", fontWeight: "bold" }} 
                                uppercase={false} 
                                onPress={() => { }}>Sign in with Google</Button>
                                <Button icon={() => (<Image
                                    style={{ height: 22, width: 22 }}
                                    source={require('../image/facebook.png')}
                                    resizeMode="contain"
                                />)} mode="contained" 
                                style={{ marginTop: 8 }} 
                                labelStyle={{ fontWeight: "bold" }} 
                                uppercase={false} 
                                color="#3b5998" 
                                onPress={() => { }}>Sign in with Facebook</Button>
                         
                        </View>
                    </View>
            
                             
               </View>
               </ScrollView>
            </SafeAreaView>
        </View>

    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        marginBottom: Platform.OS === 'ios' ? 12 : 0,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
