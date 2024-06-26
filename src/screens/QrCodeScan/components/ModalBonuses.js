import React from "react";
import {StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button } from 'react-native';
import Modal from "react-native-modal"

export const ModalBonuses = ({isVisible, useBonuses, currentOfferName, currentOfferId, currentUserId, idManager, cancelAction, bonuses}) => {
    const [currentNumber, setCurrentNumber] = React.useState(1)
    const [disabledBtn, setDisabledBtn] = React.useState(false)

    const plusOne = () => {
        if (currentNumber < bonuses) {
            setCurrentNumber(currentNumber + 1)
        }
    }

    const minusOne = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1)
        }
    }

    return (
        <Modal isVisible={isVisible}
            animationType="slide"
            onShow={() => {setCurrentNumber(1); setDisabledBtn(false)}}
            transparent={true}>
            <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>Списать бонусы</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Aкция: "{currentOfferName}"</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Бонусов у клиента: {bonuses}</Text>
                <View style={styles.countStyle}>
                    <TouchableWithoutFeedback onPress={minusOne}>
                        <Image source={require('../../../../assets/minus.png')} />
                    </TouchableWithoutFeedback>
                    <Text style={styles.countText}>{currentNumber}</Text>
                    <TouchableWithoutFeedback onPress={plusOne}>
                        <Image source={require('../../../../assets/plus.png')} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.buttonStyle}>
                    <Button onPress={cancelAction}
                        title="Отмена"
                        color='red' />
                    <Button onPress={() => { setDisabledBtn(true); useBonuses(currentNumber);}}
                        title="Применить"
                        color='#0EA47A'
                        disabled={disabledBtn}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    countStyle: {
        flexDirection: 'row',
        paddingTop: 20,
        gap: 15,
    },
    countText: {
        color: 'black',
        fontSize: 26,
        fontWeight: '600',
        paddingTop: 5,
        paddingLeft: 4
    },
    buttonStyle: {
        flexDirection: 'row',
        paddingTop: 25,
        gap: 20,
    },
})