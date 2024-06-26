import React from "react";
import {StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button } from 'react-native';
import Modal from "react-native-modal"

export const ModalPromotion = ({isVisible, useOffer, currentOfferName, currentOfferId,
    currentUserId, idManager, cancelAction, currentOfferType, maxCount, useCount}) => {
    const [currentNumber, setCurrentNumber] = React.useState(1)
    const [disabledBtn, setDisabledBtn] = React.useState(false)

    const plusOne = () => {
        if (currentOfferType === 'subscription') {
            if (currentNumber < maxCount - useCount) {
                setCurrentNumber(currentNumber + 1)
            }
        } else {
            setCurrentNumber(currentNumber + 1)
        }
    }

    const minusOne = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1)
        }
    }

    const title = () => {
        if (currentOfferType === 'subscription') {
            return 'Использовать подписку'
        }
        return 'Применить акцию'
    }

    return (
        <Modal isVisible={isVisible}
            animationType="slide"
            onShow={() => {setCurrentNumber(1); setDisabledBtn(false)}}
            transparent={true}>
            <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '600', marginBottom: 10 }}>{title()}</Text>
                <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>{currentOfferName}</Text>
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
                    <Button onPress={() => { setDisabledBtn(true); useOffer(currentNumber); }}
                        title="Применить"
                        disabled={disabledBtn}
                        color='#0EA47A' />
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