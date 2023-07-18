import React from 'react';
import { TouchableHighlight, StyleSheet, FlatList, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';

export const Category = props => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <FlatList horizontal={true} style={styles.flatList}
                    data={[
                        { key: 'Все' },
                        { key: 'Еда' },
                        { key: 'Услуги' },
                        { key: 'Красота' },
                        { key: 'Здоровье' },
                    ]}
                    renderItem={({ item }) =>
                        <TouchableHighlight>
                            {/* // key={item.key}
                            // onPress={() => this._onPress(item)}
                            // onShowUnderlay={separators.highlight}
                            // onHideUnderlay={separators.unhighlight}> */}
                            <View style = {styles.containerView}>
                                <Text style={styles.item}>{item.key}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingTop: 35,
        paddingLeft: 10
    },
    flatList: {
        height: 40,
    },
    containerView: {
        height: 30,
        backgroundColor: '#333333',
        margin: 5,
        borderRadius: 14,
    },
    item: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 15,
        textAlign: 'center',
        margin: 5,
    },
})