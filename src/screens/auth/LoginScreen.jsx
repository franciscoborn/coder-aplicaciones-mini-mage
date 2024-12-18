import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { clearSessions, insertSession } from '../../db';
import { assetsImages } from '../../global/importImages';
import { setUser } from '../../redux/slices/authSlice';
import { useLoginMutation } from '../../services/authService';
import { screenStyles } from '../../styles/screensStyles';


const windoWidth = Dimensions.get('window').width

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch();

    const [triggerLogin, result] = useLoginMutation();

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(setUser(result.data));

            if (rememberMe) {
                clearSessions()
                    .then(() => console.log('Sessions cleared'))
                    .catch((error) => console.error('Error clearing sessions:', error));

                insertSession({
                    localId: result.data.localId,
                    email: result.data.email,
                    token: result.data.idToken,
                })
                    .then(() => console.log('Session saved successfully'))
                    .catch((error) => console.error('Error saving session:', error));
            }
        }
    }, [result, rememberMe]);

    const handleLogin = () => {
        triggerLogin({ email, password });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screenContainer}
        >
            <ImageBackground source={assetsImages.interface.logoMiniMage}
                style={styles.backgroundImageContainer}>
                <View style={styles.loginCard}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subTitle}>Log in to your account</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#777"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            placeholderTextColor="#777"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Pressable style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </Pressable>
                    <View style={styles.rememberMeContainer}>
                        <Text style={styles.whiteText}>Remember Me</Text>
                        {
                            rememberMe
                                ?
                                <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={screenStyles.screenTitle.backgroundColor} /></Pressable>
                                :
                                <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={'gray'} /></Pressable>
                        }
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <Pressable onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground >
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    screenContainer: {
        ...screenStyles.screenContainer,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9
    },
    loginCard: {
        width: 0.9 * windoWidth,
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 8,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    inputContainer: {
        width: windoWidth,
        margin: 20,
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        fontSize: 14,
        color: '#333',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 14,
        color: '#555',
    },
    loginButton: {
        backgroundColor: screenStyles.screenTitle.backgroundColor,
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    loginButtonText: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#555',
    },
    signupText: {
        fontSize: 14,
        color: screenStyles.screenTitle.backgroundColor,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    backgroundImageContainer: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
