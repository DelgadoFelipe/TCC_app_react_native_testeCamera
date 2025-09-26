import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';

export default function CameraScanner({onCodeScanned, onCancel}) {
    const device = useCameraDevice('back');
    const {hasPermission, requestPermission} = useCameraPermission();

    const codeScanner = useCodeScanner({
        codeTypes: ["qr"],
        onCodeScanned: (codes) => {
            console.log('teste1')
            if (codes.length > 0 && codes[0].value) {
                onCodeScanned(codes[0].value);
            }
        }
    })

    useEffect(() => {
        (async () => {
            requestPermission(await Camera.requestCameraPermission() == "granted");
        })();
    }, []);

    if (!device) return onCodeScanned('no devices');
    if (!hasPermission) return onCodeScanned("permission denied");

    return (
        <View style={{flex: 1}}>
            <Camera 
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
            {/* {onCancel && (
                <TouchableOpacity>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            )} */}
        </View>


    )

}
