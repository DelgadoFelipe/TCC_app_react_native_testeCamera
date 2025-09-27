import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';
import perf, { getPerformance } from '@react-native-firebase/perf';

export default function CameraScanner({onCodeScanned, onCancel, startTime}) {
    const device = useCameraDevice('back');
    const {hasPermission, requestPermission} = useCameraPermission();

    const codeScanner = useCodeScanner({
        codeTypes: ["qr"],
        onCodeScanned: (codes) => {
            if (codes.length > 0 && codes[0].value) {
                onCodeScanned(codes[0].value);
            }
        }
    })

    useEffect(() => {
        (async () => {
            const perf = getPerformance();
            const cameraTrace = perf.newTrace('camera_open_time');
            
            requestPermission(await Camera.requestCameraPermission() == "granted");

            if (device && startTime.current) {
                await cameraTrace.start();
                const loadTime = Date.now() - startTime.current;
                console.log('teste: ' + loadTime);
            
                cameraTrace.putMetric('time_ms', loadTime);
                cameraTrace.stop();
            }
        
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
