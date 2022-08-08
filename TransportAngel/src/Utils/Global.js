import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';


export default class Global {


    static setAsynStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (err) {
            console.log("error :", err);
        }
    }

    static getAsynStorage = async (key) => {

        var value = null;
        try {
            value = await AsyncStorage.getItem(key);
            if (value != null) {
            }
        } catch (error) {
            console.log(error);
        }
        return value;
    }


    static removeAsyncValue = async (Key) => {
        var value = await AsyncStorage.removeItem(Key);
        return value;
    }

    
    // static checkInternet = (callBack) => {
        
    //     NetInfo.fetch().then(state => {
            
    //         if (state.isConnected) {
    //             callBack();
    //         } else {
    //             Alert.alert(
    //                 "Connection Failed",
    //                 "Please check your internet connection",
    //                 [
    //                     // {
    //                     //     text: "Exit",
    //                     //     onPress: () => RNExitApp.exitApp(),
    //                     // },
    //                     { text: "Try Again", onPress: () => Global.checkInternet(callBack) },
    //                     {
    //                         text: "ok",
    //                         onPress: () => { }
    //                     }
    //                 ],
    //                 { cancelable: false }
    //             );
    //         }
    //     });
    // }
}

