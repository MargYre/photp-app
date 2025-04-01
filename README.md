# Camera App with Redux

This is a React Native app using `expo-camera` to capture photos, view a gallery, and manage camera settings like flash, zoom, and front/back camera toggle. The application state is fully managed using Redux Toolkit.

## Features

- Take photos using the device camera
- Save photos locally to the file system
- View photos in a gallery with fullscreen preview
- Delete photos from the gallery
- Toggle between front and back cameras
- Control flash mode (on, off, auto)
- Control camera zoom with a slider
- Redux Toolkit for global state management

## Technologies Used

- React Native (with Expo)
- Redux Toolkit
- React Redux
- Expo Camera
- Expo File System

## Project Structure

```
.
├── App.js
├── src
│   ├── Camera.js
│   ├── store.js
│   └── store
│       └── cameraSlice.js
└── styles
    └── styles.js
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Expo CLI globally (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## Important Notes

- Ensure you grant camera permissions when prompted.
- This app saves photos to the local file system using Expo FileSystem.
- Redux is used to manage camera-related state such as flash, zoom, gallery, and current photo preview.

## License

This project is open source and free to use.
---
