
import * as React from 'react';


import { View, Text,StatusBar,Button} from 'react-native';
import Header from '../navigation/Header';


function Home({navigation}) {
    return (
        <View style={{flex:1}}>
        <StatusBar animated={true}
            backgroundColor={Constant.palette.primary.dark} />
          <Header isDrawer={true} title="Home" />
          <View>
        <Text>Home Screen</Text>
      </View>
      </View>
      
    );
  }
  
  export default Home;