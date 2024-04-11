import React from "react";
import {StyleSheet, Text, View, Button, Platform, Linking } from 'react-native';
import Modal from "react-native-modal"


export const ModalUpdate= ({isVisible, cancelAction, versionStatus}) => {
    const gotToMarket = async () => {
        if (Platform.OS === 'android') {
            await Linking.openURL("https://play.google.com/store/apps/details?id=com.offer.youoffer")
        } else {
            await Linking.openURL("https://apps.apple.com/by/app/my-offers/id6475624953")
        }
    }

    const Actions = () => {
        if (versionStatus === 'not_working_hard') {
            return (
                <View style={styles.buttonStyle}>
                    <Button onPress={gotToMarket}
                        title="Обновить"
                        color='#0EA47A' />
                </View>
            )
        } else {
            return (<View style={styles.buttonStyle}>
                <Button onPress={cancelAction}
                    title="Отмена"
                    color='red' />
                <Button onPress={gotToMarket}
                    title="Обновить"
                    color='#0EA47A' />
            </View>
            )
        }
    }

    return (
        <Modal isVisible={isVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>Обновите приложение</Text>
                <Actions/>
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