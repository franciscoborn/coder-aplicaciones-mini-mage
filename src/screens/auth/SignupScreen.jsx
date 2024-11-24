import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [genericValidationError, setGenericValidationError] = useState('');
    const [errorAddUser, setErrorAddUser] = useState(false);

    const [triggerSignup, result] = useSignupMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (result.status === 'rejected') {
            setErrorAddUser('Ups! No se pudo agregar el usuario');
        } else if (result.status === 'fulfilled') {
            dispatch(setUser(result.data));
        }
    }, [result]);

    const handleSubmit = () => {
        try {
            validationSchema.validateSync({ email, password, confirmPassword });
            setErrorEmail('');
            setErrorPassword('');
            setErrorConfirmPassword('');
            triggerSignup({ email, password });
        } catch (error) {
            switch (error.path) {
                case 'email':
                    setErrorEmail(error.message);
                    break;
                case 'password':
                    setErrorPassword(error.message);
                    break;
                case 'confirmPassword':
                    setErrorConfirmPassword(error.message);
                    break;
                default:
                    setGenericValidationError(error.message);
                    break;
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subTitle}>Sign up to get started</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errorEmail && <Text style={styles.error}>{errorEmail}</Text>}

                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}

                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
                </View>

                <Pressable style={styles.signupButton} onPress={handleSubmit}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Log In</Text>
                    </Pressable>
                </View>

                {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;

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
    signupButton: {
        width: '100%',
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    signupButtonText: {
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
    loginText: {
        fontSize: 14,
        color: '#28a745',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    error: {
        color: '#e63946',
        fontSize: 12,
        marginBottom: 10,
    },
});
