import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

const CameraView = () => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [camera, setCamera] = useState(false);

    const openCamera = () => {
        console.log('teste')
    }

    return(
        <View style={{backgroundColor: "#fff", width: width, height: height, alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: '#009be8ff', width: width * 0.53, height: height * 0.075, marginTop: height * 0.09, borderRadius: width * 0.02, alignItems: 'center', justifyContent: 'center'}} onPress={() => openCamera()}>
                <Text style={{fontSize: width * 0.047, color: '#fff'}}>Abrir câmera</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CameraView;
