import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { observer } from "mobx-react-lite" 
import BonusCardStore from '../../../stores/bonusCard'
import { Keyboard } from 'react-native';
import { FILE_URL } from '../../../services/constants'
import { BarcodeCreatorView, BarcodeFormat } from "react-native-barcode-creator";
import { setNeedToReloadBonusCardsLisr } from '../../../services/globals'

export const NewCard = observer(({ navigation }) => {
    const [type, setType] = useState('');
    const [typeId, setTypeId] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const save = async () => {         
        if (loading) return;   
        setLoading(true)
        await BonusCardStore.saveCard({
            name: name,
            code: number,
            id: type?.id
        })
        setNeedToReloadBonusCardsLisr(true)
        navigation.goBack()    
        setLoading(false)  
    }

    const BarcodeView = () => {         
        if (number?.length == 0) return null
        return (
            <View style={styles.barcodeView}>                
                <Text><BarcodeCreatorView
                    value={number}
                    background={'#FFFFFF'}
                    style={styles.barcode}
                    foregroundColor={'#000000'}
                    format={BarcodeFormat.CODE128}                   
                /></Text>
                <Text style={styles.code}>{number}</Text>
            </View>
        )
    }
    
    const SaveBtn = () => {
        if (loading) {
            return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="white" />; 
        } else if (number?.length > 0 && name?.length > 0) {
            return <TouchableWithoutFeedback onPress={save}>
                <View style={styles.saveButton}>
                    <Text style={styles.title}>Сохранить</Text>
                </View>
            </TouchableWithoutFeedback>
        } else {
            return <View style={styles.saveButtonDisable}>
                <Text style={styles.title}>Сохранить</Text>
            </View>
        }
    }     

    return (
        <View style={styles.container}> 
            <Image source={
                type?.img 
                ? { uri: `${FILE_URL}${type?.img}.${type?.img_ext}`}
                : require('../../../../assets/discontCard.png')} 
                style={styles.imageContainer} 
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.createUserBlock}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={typeId}
                            onValueChange={(itemValue, itemIndex) =>{
                                setTypeId(itemValue)
                                const item = BonusCardStore.list.find((item) => item.id === itemValue)
                                setType(item)
                                setName(item?.name || '')
                            }}>
                                <Picker.Item label={"Нет в списке"} value={{name: ''}}/>
                                {
                                    BonusCardStore.list.map((item) => {
                                        return (
                                            <Picker.Item label={item.name} value={item.id} key={item.id} />
                                        )
                                    })
                                }                          
                        </Picker>
                    </View>   
                    <TextInput style={[styles.codeInputStyle]}
                        onChangeText={(v) => { setName(v) }}
                        value={name}
                        keyboardType='default'
                        placeholder="Наименование"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle,]}
                        onChangeText={(v) => { setNumber(v) }}
                        value={number}
                        keyboardType='number-pad'
                        placeholder="Данные штрих кода карты"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                </View>
            </TouchableWithoutFeedback> 
            <BarcodeView />
            <SaveBtn />
        </View>
    )
})

const styles = StyleSheet.create({
    pickerContainer: {
        borderRadius: 10, // Закругленные углы
        overflow: 'hidden', // Скрывает элементы, выходящие за границы контейнера
        backgroundColor: '#333', // Фон контейнера        
    },
    picker: {      
        color: '#fff', // Цвет текста для Picker
        backgroundColor: '#333', // Цвет фона для Picker
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 30,
    },
    imageContainer: {
        width: '95%',
        height: 200,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    createUserBlock: {
        width: '95%',
        flexDirection: 'column',
        gap: 12,
    },
    codeInputStyle: {
        color: 'white',
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#0EA47A',
        height: 50,
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonDisable: {
        backgroundColor: 'gray',
        height: 50,
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    barcodeView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '95%',
        padding: 5,
        paddingTop: 10,
        gap: 5,
        alignItems: 'center',
    },
    barcode: {
        width: 300,
        height: 80,
    },
    code: {
        fontSize: 17,
        color: 'black',
        fontWeight: '400',
    },
})