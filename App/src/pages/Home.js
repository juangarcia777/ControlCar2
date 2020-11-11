import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import api from '../services';
import {ApontsSchema, PersonSchema, CarSchema} from '../schemas';



export default function Home() {

    const navigation = useNavigation();

    const [ini_viagem, setIni_viagem] = useState(false)

    // USER
    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [user, setUser] = useState('Juan')
    const [senha, setSenha] = useState('123')
    const [login, setLogin] = useState(false)

    // CARRO
    const [id_carro, setIDCarro] = useState(0)
    const [carro, setCarro] = useState()
    const [placa, setPlaca] = useState()
    const [cor, setCor] = useState()
    const [foto, setFoto] = useState()

    useEffect(() => {
        Realm.open({schema: [ PersonSchema, ApontsSchema]})
        .then(realm => {

            const u = realm.objects('Person');
            const y = realm.objects('Aponts');
            y.map((item)=> {
                console.log("ID-USer="+item.id_user)
            })
            console.log('Na HOME: '+u[0].id_carro+'  User:'+ u[0].id)
            let dados= u[0]
            setId(dados.id)
            setNome(dados.nome)
            setUser(dados.usuario)
            setSenha(dados.senha)
            
            setIDCarro(dados.id_carro)
            setCarro(dados.carro)
            setPlaca(dados.placa)
            setCor(dados.cor)
            setFoto(dados.foto)

            // Remember to close the realm when finished.
            realm.close();
        })
        .catch(error => {
            console.log(error);
        });

    }, [])

    return (
        <View style={styles.container}> 
            <View style={styles.box1}>
                <View style={styles.infoCarro}><Text>{nome}</Text></View>
                <View style={styles.infoCarro}><Text>{carro}</Text><Text>{placa}</Text></View>
            </View>
            <Button title="Abrir Viagem" onPress={()=> alert('ola') }  />

            {ini_viagem &&
            <View style={{marginTop: 30}}>
                <TextInput style={styles.input} placeholder="Usuário" />
                <TextInput style={styles.input} placeholder="Senha"  />

                <TouchableOpacity style={styles.botao}>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
            }

        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    box1: {
        width: 300,
        marginTop: 50,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 300,
        height: 60
    },
    botao: {
        width: 100,
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#00FF00'
    },
    infoCarro: {
        justifyContent: "center",
        alignItems: 'center'
    }
})