import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { insertSession, clearSessions } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.9;

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();

    const [triggerLogin, result] = useLoginMutation();

    useEffect(() => {
        if (result.isSuccess) {
            console.log('Login successful:', result.data);
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
            style={styles.container}
        >
            <View style={styles.card}>
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

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
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
        width: '100%',
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
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
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 14,
        color: '#555',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
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
        color: '#28a745',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});
