# 📷 Photo App

A React Native camera application built with **Expo**, featuring **photo capture, zoom functionality, flash toggle, and a built-in gallery**.

## 🚀 Features

- 📸 Capture photos and save them locally.
- 🔍 Zoom functionality using a slider.
- ⚡ Toggle between **flash on, off, and auto**.
- 🔄 Switch between **front and back cameras**.
- 🖼️ View saved photos in the gallery.
- 🗑️ Delete photos from the gallery.

---

## 📂 Project Structure

```
photp-app/
│── my_camera/
│   ├── src/
│   │   ├── Camera.js  # Main camera screen
│   │   ├── styles/
│   │   │   ├── styles.js  # Styling for the app
│   ├── package.json  # Dependencies
│   ├── .gitignore  # Ignoring unnecessary files
```

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the repository**
```sh
git clone https://github.com/your-username/photp-app.git
cd photp-app/my_camera
```

### 2️⃣ **Install dependencies**
```sh
npm install
```

### 3️⃣ **Run the app**
```sh
npx expo start
```
📱 Scan the QR code with your Expo Go app (Android/iOS) to launch the project.

---

## 🎮 Usage

- **Take a photo**: Press the capture button.
- **Switch cameras**: Tap the camera toggle button.
- **Adjust zoom**: Use the slider on the right.
- **Enable flash**: Tap the flash button to cycle through flash modes.
- **Open gallery**: Tap the gallery button to view saved photos.
- **Delete a photo**: Open a photo in fullscreen and tap the delete button.

---

## 🛑 Known Issues

- The flash might not work on all devices due to hardware limitations.
- Expo Go does not support some native camera features (consider **EAS Build** for production).

---

## 📜 License

This project is licensed under the **MIT License**.

---
