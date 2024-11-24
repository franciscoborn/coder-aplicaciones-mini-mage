import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService';

const ResumeScreen = () => {
  const email = useSelector((state) => state.authReducer.value.email);
  const profilePicture = useSelector((state) => state.authReducer.value.profilePicture);
  const localId = useSelector((state) => state.authReducer.value.localId);

  const dispatch = useDispatch();

  const [triggerPutProfilePicture, { isLoading }] = usePutProfilePictureMutation();

  const verifyCameraPermissions = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    if(!granted) return false
    return true
}

  const handleTakePicture = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permisos insuficientes',
        'Necesitas otorgar permisos de cámara para usar esta función.'
      );
      return;
    }
    console.log("hola")
    const imageResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    console.log("chao")
    if (!imageResult.cancelled) {
      dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
      triggerPutProfilePicture({image: `data:image/jpeg;base64,${result.assets[0].base64}`,localId})
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {email}</Text>
      <Pressable onPress={handleTakePicture} style={styles.profilePictureContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <Text style={styles.profilePicturePlaceholder}>
            Toca para añadir foto de perfil
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  profilePictureContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  profilePicturePlaceholder: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
