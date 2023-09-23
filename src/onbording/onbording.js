import React from "react";
import {ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

export const Onbording = props => {
    return (
        <View style = {styles.container}>
            <Image source={require('../assets/logo.png')}/>
            <Text style = {styles.textStyle}> YOU OFFER </Text>
            <ActivityIndicator size={'large'} color = 'white' style = {styles.louder}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }, 
     textStyle: {
       color: 'white',
       fontSize: 56,
       fontStyle: 'italic',
       fontWeight: 'bold',
       paddingTop: 50,
     },
     louder: {
       paddingTop: 100,
       fontSize: 50
     }
  });