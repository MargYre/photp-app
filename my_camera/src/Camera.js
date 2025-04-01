import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGallery,
  addPhoto,
  deletePhotoByName,
  setCapturedImage,
  clearCapturedImage,
  setFlashMode,
  setFacing,
  setZoom
} from './store/cameraSlice';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {
  View, Text, TouchableOpacity, Image, ScrollView, Modal, Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles/styles';

const CameraScreen = () => {
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  const facing = useSelector(state => state.camera.facing);
  const flashMode = useSelector(state => state.camera.flashMode);
  const zoom = useSelector(state => state.camera.zoom);
  const gallery = useSelector(state => state.camera.gallery);
  const capturedImage = useSelector(state => state.camera.capturedImage);

  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);

  const FLASH_MODE = { on: 'on', off: 'off', auto: 'auto' };
  const PHOTO_DIRECTORY = FileSystem.documentDirectory + 'photos/';

  const ensurePhotoDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIRECTORY);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(PHOTO_DIRECTORY, { intermediates: true });
    }
  };

  const loadGallery = async () => {
    await ensurePhotoDirectoryExists();
    const files = await FileSystem.readDirectoryAsync(PHOTO_DIRECTORY);
    const images = files.map(file => ({ uri: PHOTO_DIRECTORY + file, name: file }));
    dispatch(setGallery(images));
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const toggleCameraFacing = () => {
    dispatch(setFacing(facing === 'back' ? 'front' : 'back'));
  };

  const toggleFlashMode = () => {
    const nextMode = flashMode === FLASH_MODE.off ? FLASH_MODE.on
                    : flashMode === FLASH_MODE.on ? FLASH_MODE.auto
                    : FLASH_MODE.off;
    dispatch(setFlashMode(nextMode));
  };

  const getFlashIcon = () => {
    return flashMode === FLASH_MODE.on ? '⚡'
         : flashMode === FLASH_MODE.auto ? '⚡A'
         : '⚡❌';
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    const fileName = `photo_${Date.now()}.jpg`;
    const fileUri = PHOTO_DIRECTORY + fileName;

    await ensurePhotoDirectoryExists();
    await FileSystem.moveAsync({ from: photo.uri, to: fileUri });

    dispatch(setCapturedImage({ uri: fileUri }));
    dispatch(addPhoto({ uri: fileUri, name: fileName }));
  };

  const deletePhoto = () => {
    if (!selectedImageName) return;

    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const fileUri = PHOTO_DIRECTORY + selectedImageName;
            await FileSystem.deleteAsync(fileUri);
            dispatch(deletePhotoByName(selectedImageName));
            setSelectedImage(null);
            setSelectedImageName(null);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
            <Text style={styles.deleteText}>🗑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeModalButton} onPress={() => {
            setSelectedImage(null);
            setSelectedImageName(null);
          }}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {showGallery ? (
        <View style={styles.galleryContainer}>
          <Text style={styles.title}>Gallery</Text>
          <ScrollView contentContainerStyle={styles.galleryScrollView}>
            {gallery.length > 0 ? (
              gallery.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  setSelectedImage(image.uri);
                  setSelectedImageName(image.name);
                }}>
                  <Image source={{ uri: image.uri }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No photos available</Text>
            )}
          </ScrollView>
          <TouchableOpacity style={styles.retakeButton} onPress={() => setShowGallery(false)}>
            <Text style={styles.retakeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.camera} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(clearCapturedImage())}>
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          zoom={zoom}
          flash={flashMode}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
              <Text style={styles.text}>{getFlashIcon()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.photoButton}>
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowGallery(true)} style={styles.galleryButton}>
              <Text style={styles.text}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.zoomContainer}>
            <Slider
              style={styles.zoomSlider}
              minimumValue={0}
              maximumValue={1}
              step={0.05}
              value={zoom}
              onValueChange={(value) => dispatch(setZoom(value))}
              minimumTrackTintColor="white"
              maximumTrackTintColor="gray"
              thumbTintColor="white"
            />
            <Text style={styles.zoomText}>Zoom: {(zoom * 100).toFixed(0)}%</Text>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default CameraScreen;
