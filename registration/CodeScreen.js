import React from "react";
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Code } from "../Networking/LoginService/logineService";
import {AsyncStorage} from 'react-native';


export const CodeScreen = ({navigation}) => {
    const [number, setNumbet] = React.useState('');

    const pressHandler = async () => {
        // const phone = await AsyncStorage.getItem('phone').toString()
        // console.log('222', phone)
        // Code(phone, number)
        setNumbet('')
        navigation.navigate('CreateUserScreen')
    }

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.container}>
            <Image source={require('../assets/logo.png')} style = {styles.imageStyle}/>
            <Text style = {styles.textStyle}>Регистрация</Text>
            <View style ={styles.phoneBlock}>
            <TextInput style = {styles.codeInputStyle} 
                        onChangeText= {setNumbet} 
                        value={number}
                        keyboardType= 'numeric'
                        placeholder = "Код" 
                        maxLength={4}
                        placeholderTextColor={'grey'}/> 
             </View>
          <TouchableOpacity style = {[styles.buttonStyle, {opacity: number.length == 4 ? 1 : 0.3}]} 
                                    disabled = { number.length == 4 ? false : true }
                                    onPress = {pressHandler}>
            <Text style = {styles.buttonText}>Вход</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      )
}

const styles = StyleSheet.create({
    imageStyle: {
       width: 120,
       height: 120,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 80
    },
    textStyle: {
      color: 'white',
      fontSize: 30,
      paddingBottom: 30,
      paddingTop: 30
    },
    phoneBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30,
    },
    codeInputStyle: {
        color: 'white',
        width: '80%',
        height: 50,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 8,
        textAlign: 'center'
    },
    buttonStyle: {
        width: '40%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#57A167',
        opacity: 0.3,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
})