import React from "react";
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';
import {Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SwitchSelector from "react-native-switch-selector";

export const CreateUserScreen = ({navigation}) => {
    const [name, setName] = React.useState('');
    const [sirname, setSirname] = React.useState('');
    const [birsday, setBirsday] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gander, setGander] = React.useState('');

    const options = [
        { label: "Женский", value: "1" },
        { label: "Мужской", value: "2" }
      ];

    const pressHandler = () => {
        setName('')
    }

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.container}>
            <Text style = {styles.textStyle}>Заполните ваши данные</Text>
            <View style ={styles.createUserBlock}>
            <TextInput style = {styles.codeInputStyle} 
                        onChangeText= {setName} 
                        value={name}
                        keyboardType= 'default'
                        placeholder = "Имя" 
                        maxLength={20}
                        placeholderTextColor={'grey'}/> 
            <TextInput style = {styles.codeInputStyle} 
                        onChangeText= {setSirname} 
                        value={sirname}
                        keyboardType= 'default'
                        placeholder = "Фамилия" 
                        maxLength={30}
                        placeholderTextColor={'grey'}/> 
            <SwitchSelector style = {styles.switcherStyle}
                        initial={0}
                        onPress={setGander}
                        backgroundColor= 'black'
                        textColor= 'gray'
                        selectedColor= 'black'
                        buttonColor= 'gray'
                        borderColor= 'gray'
                        borderRadius = {8}
                        hasPadding
                        options={[
                            { label: "Женский", value: "f"}, //imageIcon: images.feminino },
                            { label: "Мужской", value: "m"} //imageIcon: images.masculino }
                        ]}/>
            <TextInput style = {styles.codeInputStyle} 
                        onChangeText= {setBirsday} 
                        value={birsday}
                        keyboardType= 'number-pad'
                        placeholder = "Дата Рождения" 
                        maxLength={20}
                        placeholderTextColor={'grey'}/> 
            <TextInput style = {styles.codeInputStyle} 
                        onChangeText= {setEmail} 
                        value={email}
                        keyboardType= 'email-address'
                        placeholder = "e-mail" 
                        maxLength={30}
                        placeholderTextColor={'grey'}/> 
             </View>
          <TouchableOpacity style = {[styles.buttonStyle]} 
                                    onPress = {pressHandler}>
            <Text style = {styles.buttonText}>Вход</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingTop: 30
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        paddingBottom: 20,
        paddingTop: 30
      },
    createUserBlock: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    codeInputStyle: {
        color: 'white',
        margin: 5,
        width: '90%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    switcherStyle: {
        margin: 5,
        width: '90%',
        height: 40
    },
    buttonStyle: {
        width: '40%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#57A167',
        opacity: 0.3,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        paddingHorizontal: 50
    },
})