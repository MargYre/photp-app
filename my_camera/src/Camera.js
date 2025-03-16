import React, { useState, useEffect, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image, ScrollView, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import styles from './styles/styles';

const CameraScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [zoom, setZoom] = useState(0);
  
  // Flash modes according to Expo documentation
  const FLASH_MODE = {
    on: 'on',
    off: 'off',
    auto: 'auto'
  };
  
  // State for flash mode
  const [flashMode, setFlashMode] = useState(FLASH_MODE.off);
  const cameraRef = useRef(null);
  
  const PHOTO_DIRECTORY = FileSystem.documentDirectory + 'photos/';

  // Ensure "photos" directory exists
  const ensurePhotoDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIRECTORY);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(PHOTO_DIRECTORY, { intermediates: true });
      console.log("'photos' directory created!");
    }
  };

  // Load stored images
  const loadGallery = async () => {
    try {
      await ensurePhotoDirectoryExists();
      const files = await FileSystem.readDirectoryAsync(PHOTO_DIRECTORY);
      const images = files.map(file => ({ uri: PHOTO_DIRECTORY + file, name: file }));
      setGallery(images);
      console.log("Gallery loaded with", images.length, "photos!");
    } catch (error) {
      console.error("❌ Error loading photos:", error);
    }
  };

  // Load gallery on app start
  useEffect(() => {
    loadGallery();
  }, []);

  // Toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };
  
  // Function to toggle flash modes
  const toggleFlashMode = () => {
    setFlashMode((currentMode) => {
      switch (currentMode) {
        case FLASH_MODE.off:
          return FLASH_MODE.on;
        case FLASH_MODE.on:
          return FLASH_MODE.auto;
        case FLASH_MODE.auto:
          return FLASH_MODE.off;
        default:
          return FLASH_MODE.off;
      }
    });
  };
  
  // Function to get the flash icon based on the mode
  const getFlashIcon = () => {
    switch (flashMode) {
      case FLASH_MODE.on:
        return '⚡';
      case FLASH_MODE.auto:
        return '⚡A';
      case FLASH_MODE.off:
        return '⚡❌';
      default:
        return '⚡❌';
    }
  };

  // Take a photo and save it
  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      const fileName = `photo_${Date.now()}.jpg`;
      const fileUri = PHOTO_DIRECTORY + fileName;

      await ensurePhotoDirectoryExists();
      await FileSystem.moveAsync({ from: photo.uri, to: fileUri });

      setPreviewVisible(true);
      setCapturedImage({ uri: fileUri });
      setGallery([...gallery, { uri: fileUri, name: fileName }]);

      console.log(" Photo taken and saved:", fileUri);
    } catch (error) {
      console.error(" Error taking photo:", error);
    }
  };

  // Delete a photo from fullscreen
  const deletePhoto = async () => {
    try {
      if (!selectedImageName) return;

      const fileUri = PHOTO_DIRECTORY + selectedImageName;
      
      // Confirm before deleting
      Alert.alert(
        "Delete Photo",
        "Are you sure you want to delete this photo?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive", 
            onPress: async () => {
              await FileSystem.deleteAsync(fileUri);
              setGallery(gallery.filter(photo => photo.name !== selectedImageName));
              setSelectedImage(null);
              setSelectedImageName(null);
              console.log(" Photo deleted:", fileUri);
            }
          }
        ]
      );
    } catch (error) {
      console.error(" Error deleting photo:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fullscreen Image Modal with Delete Button */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          {/* Delete Button */}
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
      ) : previewVisible && capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.camera} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setCapturedImage(null)}>
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
            
            {/* Flash button */}
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

          {/* Zoom Slider */}
          <View style={styles.zoomContainer}>
            <Slider
              style={styles.zoomSlider}
              minimumValue={0}
              maximumValue={1}
              step={0.05}
              value={zoom}
              onValueChange={(value) => setZoom(value)}
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
