# 🛍️ React Native eCommerce App

A modern React Native eCommerce app for Android that allows users to browse products, view details, and manage their cart.

## 🔧 Features

- 🛒 Browse product list
- 📦 View detailed product information (price, description, etc.)
- 🧺 Add and remove items from cart
- 🔐 User authentication with login and signup
- 🎨 Clean UI with custom styling

---
## 📸 App Screenshots

### Welcome Screen  
<!-- <img src="https://github.com/user-attachments/assets/0f483ff7-2051-44af-8e38-c16ed28e5418" width="350" alt="Welcome Screen" />   -->
<br>

### Login Screen  
<!-- <img src="https://github.com/user-attachments/assets/74d4227c-2a9d-498b-a033-f10b8c1492d3" width="350" alt="Login Screen" />   -->
<br>

### Home Screen  
<!-- <img src="https://github.com/user-attachments/assets/dc0ce893-ec04-4149-b149-62d45ec4330c" width="350" alt="Home Screen" />   -->
<br>

### Saved Screen
<!-- <img src="https://github.com/user-attachments/assets/8da0e10c-7b23-46ab-8467-e0bfce309b74" width="350" alt="Restaurant Info Screen" />   -->
<br>

### Cart Screen  
<!-- <img src="https://github.com/user-attachments/assets/c618f137-cec5-475e-8f99-239f23e157b9" width="350" alt="History Screen" />   -->
<br>

### Profile Screen  
<!-- <img src="https://github.com/user-attachments/assets/009f2090-333d-43ff-b8c8-becd866d2e4c" width="350" alt="Profile Screen" /> -->


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
