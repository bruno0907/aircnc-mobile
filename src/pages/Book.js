import React, { useState} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native'

import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id');

    const [ date, setDate ] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    };

    function handleCancel(){
        navigation.navigate('List');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                 <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginTop: 50,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        alignSelf: 'stretch',
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
        alignSelf: 'stretch',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,    
    },
    cancelButton: {   
        backgroundColor: '#CCC',
    },

});
