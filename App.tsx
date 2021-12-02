import React from 'react';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

import { Routes } from './src/routes';
import { firebaseConfig } from './src/config/firebase.config';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style='light' />
    </>
  );
}
