import { View, Text, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fonts from '../Utils/Fonts'
import Constant from '../Utils/Constant'

const Dropdown = ({ data = [], value = {}, onSelect = () => { } }) => {
    console.log('dropdata', data, 'value id dropdwon',typeof(value));
    console.log('dropdata', data, 'value id dropdwon',value == null);
    console.log('selected value', !!value);
    const [showoption, setshowoption] = useState(false)

    const onSelectedItem = (val) =>{
        setshowoption(false)
         onSelect(val)
    }
    return (
        <View style={{ }}>
            <TouchableOpacity
                style={styles.dropdownstyle}
                activeOpacity={0.8}
                onPress={() => setshowoption(!showoption)}
            >
                <Text style={{textAlign:'center'}}>{!!value ? value.vehicle_no : 'choose an options'}</Text>
                <FontAwesome style={{alignSelf:'center'}} name={showoption ? 'sort-up' :'sort-down'}/>
            </TouchableOpacity>
            {showoption && (<View style={{
                backgroundColor:Constant.LOGIN,
                padding:8,
                borderRadius:6,
                maxHeight:150,
                width:'100%',
                // position:'absolute',
            }}>
                <ScrollView 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                >
                {data.map((val, i) => {
                    // console.log('val', val);
                    return (
                        <TouchableOpacity 
                        key={String(i)}
                        onPress={() => onSelectedItem(val)}
                        style={{
                            backgroundColor: value == null ? "white" :  value._id == val._id ? 'pink' : 'white',
                            paddingVertical:8,
                            borderRadius:4,
                            paddingHorizontal:6
                        }}
                        >
                        <Text>{val.vehicle_no}</Text>
                        </TouchableOpacity>
                     )
                })
                }
                </ScrollView>
            </View>)}
        </View>
    )
}

export default Dropdown
const styles = StyleSheet.create({
    dropdownstyle: {
        backgroundColor: `rgba(0,0,0,0.2)`,
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:4,
    },
    selectedItemStyle:{
        paddingVertical:4,
        borderRadius:4,
        paddingHorizontal:4,
        marginBottom:4
    }
})