import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    ImageBackground,
    Alert,
    StatusBar
} from 'react-native';
import Constant from '../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CommonActions } from '@react-navigation/native';

import String from '../Utils/String';

const languageset_DATA = [

    {

        langString: 'nr',
        name: "Norway",
        img: require('../image/norway.png'),


    },
    {
        langString: 'en',
        name: "English",
        img: require('../image/english.png'),
    },

  



]



function Language({ navigation, route }) {

    const [visible, setVisible] = React.useState(false);
    const [language, setLanguage] = React.useState("");
    const [langStr, setLngStr] = React.useState("");



    useEffect(() => {


    }, [])

    const _onSetLanguageToItalian = async (lang) => {


        console.log("Set Language", lang);
        String.setLanguage(lang);
        setLanguage({})
     //   await Global.setAsynStorage(Constant.LANGUAGE, lang);



            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "DrawerNav"
                        }
                    ],
                })
            );

       
        // this.setState({});
    }


    const renderLanguage = ({ item }) => {

        console.log("---------------");
        console.log("langStr", langStr);

       
        return (


            <View style={{flex:1 ,justifyContent:'center',alignContent:'center'}}>
            <TouchableOpacity onPress={() => setLngStr(item.langString)}  >


                <View style={{flex:1, alignItems: 'center' }}>
                    <View style={{ marginTop: 5, justifyContent: 'space-around', backgroundColor: langStr === item.langString ? "#ebe0df" : Constant.WHITE, padding: 10 }}>
                        <View>
                            <Image
                                style={{ height: 70, width: 70 }}
                                source={item.img}
                                resizeMode="cover"
                                // resizeMode="contain"
                            />
                        </View>
                        {
                            langStr === item.langString ?


                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <AntDesign color={Constant.PRIMARY_COLOR} size={20} name={'checkcircle'} solid />
                                </View>

                                :
                                null

                        }

                    </View>

                    <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: Constant.BlACk }}>{item.name}</Text>

                    </View>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>


                    </View>


                </View>
            </TouchableOpacity>
            </View>
        )
    }



    return (

        <View style={{ flex: 1 ,justifyContent:'center'}}>

           
            


                <View style={{ justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: Constant.PRIMARY_COLOR }}>Choose Language</Text>
                    </View>
                    <View style={{ margin: 5 }}>
                        <FlatList
                            data={languageset_DATA}
                            renderItem={renderLanguage}
                        />
                    </View>

                    <View style={{padding:15,justifyContent:'center',alignItems:'center' ,marginRight: 50, marginLeft: 50, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => _onSetLanguageToItalian(langStr)}>
                        <LinearGradient colors={[Constant.LOGIN, Constant.LOGIN]}
                                style={{
                                    marginTop: 10,
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
                                }} >Continue</Text>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

        </View>


    );
};

export default Language;
