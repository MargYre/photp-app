import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gallery: [],
  capturedImage: null,
  flashMode: 'off',
  facing: 'back',
  zoom: 0,
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    addPhoto: (state, action) => {
      state.gallery.push(action.payload);
    },
    deletePhotoByName: (state, action) => {
      state.gallery = state.gallery.filter(photo => photo.name !== action.payload);
    },
    setCapturedImage: (state, action) => {
      state.capturedImage = action.payload;
    },
    clearCapturedImage: (state) => {
      state.capturedImage = null;
    },
    setFlashMode: (state, action) => {
      state.flashMode = action.payload;
    },
    setFacing: (state, action) => {
      state.facing = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
  },
});

export const {
  setGallery,
  addPhoto,
  deletePhotoByName,
  setCapturedImage,
  clearCapturedImage,
  setFlashMode,
  setFacing,
  setZoom,
} = cameraSlice.actions;

export default cameraSlice.reducer;
