import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    Image, 
    TextInput, 
    TouchableOpacity,
    AsyncStorage } from 'react-native'

import api from '../services/api'

import logo from '../../assets/logo.png'

export default function Login({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ techs, setTechs ] = useState('');

    // Similar ao React, aqui está buscando no AsyncStorage se o usuário está logado e redirecionando para a tela quando o app sofrer um reload
    useEffect( () => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        })
    }, [] )

    async function handleSubmit() {
        const response = api.post('/sessions', {
            email
        })

        const { _id } = (await response).data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        // Diferente do ReactJS, que usa o history para navegar entre telas, no RN existe o navigation.
        navigation.navigate('List');
    };

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu-email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu-email"
                    placeholderTextColor="#999"                        
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        backgroundColor: '#f05a5b',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});