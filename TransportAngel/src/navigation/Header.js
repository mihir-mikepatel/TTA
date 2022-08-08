import React from 'react';
import { Appbar, shadow } from "react-native-paper";
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from '../Utils/Constant';
import Fonts from '../Utils/Fonts';


export default Header = ({ title, isDrawer, isLogoV = false, button, navigation, rbutton,ebutton}) => {

    // const navigation = useNavigation();

    // console.log('navigation',navigation);

    const getLogoImage = () => {
        return (
            <View style={{}}>
                <Image style={{ height: 54, width: 220 }} resizeMode="contain" source={require('../image/moving.png')} />
            </View>
        );
    }

    if (isDrawer) {
        return (
            <Appbar.Header style={[{ backgroundColor:Constant.palette.primary.main },styles.shadow]}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ paddingLeft: 4, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                // alert('1')
                                navigation.dispatch(DrawerActions.toggleDrawer(),
                                    console.log(navigation));
                            }}>
                            <Ionicons name="ios-reorder-three" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "60%", justifyContent: "center" }} >
                        <Text style={{ color:'white', fontWeight: "bold", fontSize:Fonts.FONTSIZE.MEDIUM}}>{title}</Text>
                        {/* {getLogoImage()} */}
                    </View>
                    <View style={{ width: '27%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {
                            ebutton ?
                                <TouchableOpacity onPress={() => navigation.navigate('Profileedit')} style={{}}>
                                    <Text style={{ color:'white', fontSize: Fonts.FONTSIZE.MEDIUM }}>Edit</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
            </Appbar.Header>
        );
    }
    else {
        return (
            <Appbar.Header style={[{ backgroundColor:Constant.palette.primary.main },styles.shadow]}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ paddingLeft: 4, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={{ paddingHorizontal: 4 }}
                        >
                            <Ionicons name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "60%", justifyContent: "center" }} >
                        {/* {
                            isLogoV ?
                                getLogoImage()
                                :
                                <Text style={{ color: Constant.PRIMARY_COLOR, fontWeight: "bold", fontSize: 20 }}>{title}</Text>
                        } */}
                        <Text style={{ color:'white', fontWeight: "bold", fontSize: Fonts.FONTSIZE.MEDIUM }}>{title}</Text>
                    </View>
                    <View style={{ width: '27%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {button ?
                            <TouchableOpacity onPress={() => navigation.navigate('VehicleRegister')} style={{}}>
                                <Text style={{ color:'white', fontSize: Fonts.FONTSIZE.MEDIUM }}>Add Vehicle</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                        {
                            rbutton ?
                                <TouchableOpacity onPress={() => navigation.navigate('Routeadd')} style={{}}>
                                    <Text style={{ color: 'white', fontSize: Fonts.FONTSIZE.MEDIUM }}>Add Route</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
            </Appbar.Header>
        );
    }
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