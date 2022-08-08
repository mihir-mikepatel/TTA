import * as React from 'react';
import { View, Text, ImageBackground, Image, Alert,StatusBar } from 'react-native';
import Constant from '../Utils/Constant';
import * as Animatable from 'react-native-animatable';
import Global from '../Utils/Global';
import String from '../Utils/String';
import { useSelector } from 'react-redux'

function SplashScreen({ navigation }) {
    const { isLogin, loginData } = useSelector(state => state.loginReducer)
    const [language, setLanguage] = React.useState("");
    console.log(isLogin);
    console.log('logindata',loginData);

    React.useEffect(() => {
        _onSetLanguage()
        setTimeout(() => {
            //checkLogin()
            if (isLogin) {
                navigation.replace('MobileLogin')
            } else {
                console.log('lanme',loginData.lname);
                if (loginData.fname == undefined || loginData.lname == undefined  || loginData.city == undefined  || loginData.phone == undefined || loginData.email == undefined || loginData.usertype == undefined) {
                    navigation.replace('Register')
                } else {
                    navigation.replace('DrawerNav')
                }
            }
        }, 1500);
    }, []);

    const _onSetLanguage = async () => {
        var lang = await Global.getAsynStorage(Constant.LANGUAGE);

        String.setLanguage(lang);
        setLanguage({})
    }

    const checkLogin = async () => {
        var isLogin = await Global.getAsynStorage(Constant.AS_ISLOGIN);
        var lang = await Global.getAsynStorage(Constant.LANGUAGE);

        if (lang == null) {
            navigation.replace('Language', { lastScreen: "splash" });
        } else {
            navigation.replace('MobileLogin')
            //   if (isLogin) {
            //     navigation.replace('DrawerNavigator');
            //   } else {

            //     navigation.replace('SignUpScreen')
            //   }
        }

    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: Constant.LOGIN }}>
        <StatusBar animated={true}
            backgroundColor={Constant.palette.primary.dark} />
            <Animatable.View
                animation="fadeInUpBig"
                style={{ flex: 0.7, justifyContent: 'center' }}>
                <Image source={require('../image/moving.png')}
                    style={{}}>
                </Image>
            </Animatable.View>
            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                <Animatable.Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }} animation="slideInDown" iterationCount={5} direction="alternate">Transport Angel</Animatable.Text>
                <Animatable.Text style={{ fontSize: 20, color: 'white', }} animation="slideInDown" iterationCount={5} direction="alternate">Stay connect with everyone!</Animatable.Text>
            </View>
        </View>
    );
}

export default SplashScreen;

