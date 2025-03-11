import React, { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
//import * as FileSystem from 'expo-file-system';
import styles from './styles/styles';

const Camera = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  
  if (!permission) {
    return <View />;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setPreviewVisible(true);
      setCapturedImage(photo);

      //Utiliser expo-file-system' pour save de façon permanente

    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <View style={styles.container}>
          <Image
            source={{ uri: capturedImage.uri }}
            style={styles.camera}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={__retakePicture}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePicture}
              style={styles.photoButton}
            >
              <Text style={styles.text}>PHOTO</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default Camera;