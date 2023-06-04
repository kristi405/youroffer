import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert('', 'Qr code успешно применен')
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned &&
                <TouchableOpacity style={[styles.buttonStyle]} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Сканировать снова</Text>
                </TouchableOpacity>
                //   <Button style={styles.button} title={'Сканировать снова'} color={'black'} onPress={() => setScanned(false)} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    buttonStyle: {
        width: '80%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#57A167',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#ccc'
    }
});