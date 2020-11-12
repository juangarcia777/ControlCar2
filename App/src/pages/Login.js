import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

import api from '../services';

var connected;
var logged;

export default function Login() {

    const navigation = useNavigation();

    

    // STATES
    // ---------------------------------------------
    const [load, setLoad] = useState(false)

    // USER
   
    const [user, setUser] = useState('Juan')
    const [senha, setSenha] = useState('123')

   
    // FUNÇÕES
    // -------------------------------------------------

    function getCar(e) {
        return new Promise((resolve, reject) => {
            resolve(api.get('cars/getall/'+e))
        })
    }

    // function getAponts(id_user, id_car) {
    //     return new Promise((resolve, reject) => {
    //         resolve(api.get('aponts/get/'+id_user+'/'+id_car))
    //     })
    // }

    const handleSave = async () => {

            let data=[{"login":false, "id_user": "", "nome": "", "carro": "", "placa": "", "cor":"", "foto":"", "id_carro": ""}]

            setLoad(true)

        if(!connected) {

            Realm.open({path:'projetox.realm'})
            .then(realm => {

               var obj= realm.objects('Person')
               if(obj[0].usuario === user && obj[0].senha === senha) {
                    data.login= true;
                    data.id_user= obj[0].id;
                    data.nome = obj[0].nome
                    
                    data.carro= obj[0].carro;
                    data.placa = obj[0].placa;
                    data.cor= obj[0].cor;
                    data.foto= obj[0].foto;
                    data.id_carro= obj[0].id;
                   console.log('entrou')

               } else {
                   alert('usuário e ou senha erradas !!')
               }
                
            })
            .catch(error => {
                console.log(error);
            });
                
        } else {

            await api.get('user/login/'+user+'/'+senha)
            .then( async function(response){

           
            let resp= response.data;

             if(resp.length > 0) {
                data.login= true;
                data.id_user= resp[0].id;
                data.nome = resp[0].nome
                
                const res= await getCar(resp[0].id);
                
                data.carro= res.data[0].carro;
                data.placa = res.data[0].placa;
                data.cor= res.data[0].cor;
                data.foto= res.data[0].foto;
                data.id_carro= res.data[0].id;

            } else {
                alert("Usuário e ou senha errados !")
                console.log('Senha errada')
             }

            });

        }


        setTimeout(()=> {


        if(data.login) {
        Realm.open({path:'projetox.realm'})
            .then(realm => {

                // Add another car
                realm.write(() => {
                realm.delete(realm.objects('Person'))
                const myPerson = realm.create('Person', {
                    id: data.id_user,
                    nome: data.nome,
                    usuario: user,
                    senha,
                    id_carro: data.id_carro,
                    carro: data.carro,
                    placa: data.placa,
                    cor: data.cor,
                    foto: data.foto
                    });
                });

                
            })
            .catch(error => {
                console.log(error);
            });

            setLoad(false)


            navigation.navigate("Home")

        }

        }, 2000)

        
    }

    useEffect(() => {

        async function getNet() {
        await NetInfo.fetch().then(state => {
            connected= state.isConnected;
        });
        }

        getNet();
        // -------------------------------------------------------------------

    }, [])

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