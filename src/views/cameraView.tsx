import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import CameraScanner from '../components/camera.js';

const CameraView = () => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [camera, setCamera] = useState(false);

    const readValue = (value: string) => {
        console.log('teste: ' + value);
        setCamera(false);
    }

    return(
        <TouchableWithoutFeedback>
            {camera ? (
                <CameraScanner onCodeScanned={(value: string) => {readValue(value)}} onCancel={() => setCamera(false)} />
            ):(
                <View style={{backgroundColor: "#fff", width: width, height: height, alignItems: 'center'}}>
            
                    <TouchableOpacity style={{backgroundColor: '#009be8ff', width: width * 0.53, height: height * 0.075, marginTop: height * 0.09, borderRadius: width * 0.02, alignItems: 'center', justifyContent: 'center'}} onPress={() => setCamera(true)}>
                        <Text style={{fontSize: width * 0.047, color: '#fff'}}>Abrir câmera</Text>
                    </TouchableOpacity>
                
                </View>
            )}
        </TouchableWithoutFeedback>
    )
}

export default CameraView;
