import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { screenStyles } from '../styles/screensStyles'
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../redux/slices/authSlice'
import { usePutProfilePictureMutation } from '../redux/apis/userApi';


const ProfileScreen = () => {
    const email = useSelector((state) => state.authReducer.value.email);
    const userName = useSelector((state) => state.authReducer.value.userName);
    const profilePicture = useSelector((state) => state.authReducer.value.profilePicture);
    const localId = useSelector((state) => state.authReducer.value.localId);
    const dispatch = useDispatch();

    const [triggerPutProfilePicture, { isLoading }] = usePutProfilePictureMutation();

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (!granted) return false
        return true
    }

    const handleTakePicture = async () => {
        const permissionOk = await verifyCameraPermissions()
        if (permissionOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.7
            })
            if (!result.canceled) {
                console.log("se coloca la imagen")
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
            }
        } else {
            console.log("Permisos denegados")
        }
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}> {userName} </Text>
            <View style={styles.screenBody}>
                <Pressable
                    onPress={handleTakePicture}
                    style={styles.profilePictureContainer}
                >
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
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    screenContainer: {
        ...screenStyles.screenContainer
    },
    screenTitle: {
        ...screenStyles.screenTitle,
        marginBottom: 10
    },
    screenBody: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
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
    profilePicturePlaceholder: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    profilePicture: {
        width: '100%',
        height: '100%'
    }
})