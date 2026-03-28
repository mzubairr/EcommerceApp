# 🛍️ React Native eCommerce App

A modern React Native eCommerce app for Android that allows users to browse products, view details, and manage their cart.

## 📺 Project Demo
<video src="https://github.com/user-attachments/assets/daac4595-9ab7-42a4-899d-7e64a1f81441" width="100" controls></video>

## 🔧 Features

- 🛒 Browse product list
- 📦 View detailed product information (price, description, etc.)
- 🧺 Add and remove items from cart
- 🔐 User authentication with login and signup
- 🎨 Clean UI with custom styling

---
## 📸 App Screenshots

### Signup Screen  
<img width="300" alt="Signup" src="https://github.com/user-attachments/assets/0bde0692-b60c-4649-beed-ab0a19b33420" />
<br>

### Home Screen  
<img width="300" height="2992" alt="Home" src="https://github.com/user-attachments/assets/875685fe-d5e2-460b-944a-9eb68bef4eb8" />
<br>

### Saved Screen
<img width="300" alt="Saved" src="https://github.com/user-attachments/assets/0d077d83-421b-4ef1-8af2-553ce22b1922" />
<br>

### Cart Screen  
<img width="300" alt="Cart" src="https://github.com/user-attachments/assets/ac9edab1-f1b3-415c-bd47-35f3dbf612f0" />
<br>

### Profile Screen  
<img width="300" alt="Profile" src="https://github.com/user-attachments/assets/2bcce98e-5874-405d-81f0-7c73029b5852" />

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mzubairr/EcommerceApp.git  
cd EcommerceApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Metro Bundler

```bash
npx react-native start
```

### 4. Run on Android

```bash
npx react-native run-android
```

## 📁 Folder Structure

```
ecommerce-app/
├── src/
│   ├── components/  → Reusable UI components (ProductCard, CartItem, etc.)
│   ├── navigation/  → App navigation setup
│   ├── assets/      → App images
│   ├── screens/     → App screens
│   ├── services/    → Firebase helper functions
│   └── formik/      → Formik schema for authentication
└── App.jsx
```

## 🛠 Tech Stack

- React Native CLI
- Firebase Firestore & Authentication
- React Navigation
- Formik

## 🚀 Usage

- Users can sign up or log in using Firebase Authentication.  
- Browse and view products with price and details.  
- Add or remove products from the cart.  
- Place an order. All cart and user data are stored in Firebase Firestore in real time.  

## 📝 Notes

- Firebase handles user authentication and Firestore data storage.  
- All data updates in real time from Firestore.  
- The app is currently **Android only**.  
- UI is styled using **custom StyleSheet**, no external styling libraries.  
- Checkout, payments, and location selection are **not implemented**.
