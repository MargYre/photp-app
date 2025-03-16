import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
    color: 'white',
    marginHorizontal: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 12,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  photoButton: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  galleryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 12,
    borderRadius: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 35,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  galleryScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  retakeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  retakeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  closeModalText: {
    color: 'black',
    fontWeight: 'bold',
  },
  zoomContainer: {
    position: 'absolute',
    right: '5%',
    top: '25%', 
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomSlider: {
    width: 100,
    height: 150,
    transform: [{ rotate: '-90deg' }], 
    left: 30,
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    top: 40,
    left: 20,
  },
 
    deleteButton: {
      position: 'absolute',
      bottom: 53,
      left: '67%',
      backgroundColor: 'rgb(255, 255, 255)',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    deleteText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    flashButton: {
      backgroundColor: 'rgba(255, 255, 0, 0.7)', 
      padding: 10,
      borderRadius: 10,
    },
    flashText: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
  
});

export default styles;
