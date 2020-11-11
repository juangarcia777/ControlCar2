import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import api from '../services';
import {CarSchema, PersonSchema, ApontsSchema} from '../schemas';

export default function Login() {

    const navigation = useNavigation();

    // STATES
    // ---------------------------------------------
    const [load, setLoad] = useState(false)

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

    // // APONTAMENTOS
    // const [id_user_ap, setIdUser] = useState()
    // const [id_car_ap, setCarAp] = useState()
    // const [km_inicial, setKmInicial] = useState()
    // const [km_final, setKmInicial] = useState()
    // ----------------------------------------------------

    // FUNÇÕES
    // -------------------------------------------------

    function getCar(e) {
        return new Promise((resolve, reject) => {
            resolve(api.get('cars/getall/'+e))
        })
    }

    function getAponts(id_user, id_car) {
        return new Promise((resolve, reject) => {
            resolve(api.get('aponts/get/'+id_user+'/'+id_car))
        })
    }

    const handleSave = async () => {
            console.log('entrei')
            setLoad(true)
            console.log('fiz a req')
            await api.get('user/login/'+user+'/'+senha)
            .then(function(response){

            let resp= response.data;

             if(resp.length > 0) {
                setLogin(true)
                setId(resp[0].id)
                setNome(resp[0].nome)
                
                getCar(resp[0].id).then(res => {
                    setCarro(res.data[0].carro) 
                    setPlaca(res.data[0].placa) 
                    setCor(res.data[0].cor)
                    setFoto(res.data[0].foto)
                    setIDCarro(res.data[0].id)

                    
                })

                

             } else {
                alert("Usuário e ou senha errados !")
                console.log('Senha errada')
             }

            });


        if(login) {
        // buscaCarro(id)
        console.log('guardando Schema == Login esta true')
        Realm.open({schema: [ PersonSchema, CarSchema]})
            .then(realm => {

                // Add another car
                realm.write(() => {
                realm.delete(realm.objects('Person'))
                const myPerson = realm.create('Person', {
                    id: id,
                    nome: nome,
                    usuario: user,
                    senha,
                    id_carro: id_carro,
                    carro,
                    placa,
                    cor,
                    foto
                    });
                });

                const u = realm.objects('Person');
                console.log(u)
                console.log('Acabei de guardar')

                // Remember to close the realm when finished.
                realm.close();
            })
            .catch(error => {
                console.log(error);
            });

            console.log("Carro: "+id_carro)
            console.log("User: "+id)

            getAponts(id, id_carro).then(apon => {

                Realm.open({schema: [ ApontsSchema ]})
                .then(realm => {

                // Add another car
                realm.write(() => {
                realm.delete(realm.objects('Aponts'))
                apon.data.map((item) => {
                        const myPerson = realm.create('Aponts', {
                        id_user: item.id_user,
                        id_car: item.id_car,
                        km_inicial: item.km_inicial,
                        km_final: item.km_final,
                        data: item.data,
                        local: item.local
                        });
                    })
                });

                // Remember to close the realm when finished.
                realm.close();
                })
                .catch(error => {
                    console.log(error);
                });

            })

            setLoad(false)

            navigation.navigate("Home")

        }
        
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={user} placeholder="Usuário" onChangeText={(e)=> setUser(e)} />
            <TextInput style={styles.input} value={senha} placeholder="Senha" onChangeText={(e)=> setSenha(e)} />
            {load &&
            <Text>Carregando...</Text>
            }
            <TouchableOpacity onPress={handleSave} style={styles.botao}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})