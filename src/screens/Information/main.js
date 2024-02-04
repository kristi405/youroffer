import React from "react";
import { StyleSheet, Text, View } from 'react-native';


export const InformationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{'\t'} * Обращаем ваше внимание, что после удаления приложения все Ваши данные будут удалены! {"\n"}
            {'\t'} * Для востановления данных необходимо будет связаться со службой поддержки и сообщить свой ID профиля.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingLeft: 10
    },
    textStyle: {
        fontSize: 15,
        color: '#fff',
        
    },
})