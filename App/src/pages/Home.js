import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Modal } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";


import api from '../services';
import NetInfo from "@react-native-community/netinfo";

var connected;

var openRealm;

export default function Home() {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [ encerrando, setEncerrando ] = useState(false);

    // NOVO APONTAMENTO
    const [km_inicial, setKmInicial] = useState()
    const [km_final, setKmFinal] = useState()
    const [obs, setObs] = useState('')
    const [array, setArray] = useState([])
    const [dataHome, setDataHome] = useState([{"id":"", "nome":"", "usuario":"", "senha":"", "id_carro":"", "carro":"", "placa":"", "cor":"", "foto":"" }]);

    const [ini_viagem, setIni_viagem] = useState(false)

    const [viagem_aberta, setViagemAberta] = useState(false)
    const [buscaUltimo, setBuscaUltimo] = useState(false)

    // ----------------------------------------------------

    var dataH= [{"id":"", "nome":"", "usuario":"", "senha":"", "id_carro":"", "carro":"", "placa":"", "cor":"", "foto":"" }];

    async function getNet() {
        await NetInfo.fetch().then(state => {
            connected= state.isConnected;
        });
        
    }

    async function encerraViagem() {

        await getNet();

        setEncerrando(true);

        setTimeout(()=> {
            encerra()
        }, 4000)
        
        function encerra() {

        if(!connected) {

        var aponts = openRealm.objects('Aponts')
        openRealm.write(()=> {
            var arr= aponts[aponts.length - 1];
            arr.km_final = parseInt(km_final);
        })

        setArray([])

        setModalVisible(false)
        setViagemAberta(false)

        alert("Voce está sem internet ! as informações serão enviadas quando a conexão voltar.")

        } else {
            console.log('Sem internet !')

            var aponts = openRealm.objects('Aponts')
            openRealm.write(()=> {
                var arr= aponts[aponts.length - 1];
                arr.km_final = parseInt(km_final);
            })

            console.log(aponts)

            async function envia() {
            
            try {

            await api.post('aponts/add', aponts )
            .then(function(response){
                console.log('salvo com sucesso no Back-end')
            }).catch((error) => console.log( error.response.request._response ) );

            openRealm.write(()=> {
                openRealm.delete(openRealm.objects('Aponts'))
            })

            setModalVisible(false)
            setViagemAberta(false)

            setArray([])

            alert('Informações sincronizadas com sucesso !')

            } catch(e) {
                console.log(e)
            }
            }
            
            envia();
        }

        setEncerrando(false);

        }// FIM encerra()

    }

    const saveApont = () => {

            getNet();

            var newKm = km_inicial.replace(/[-.]/, "")
            console.log(newKm)
            var km_init= parseInt(newKm)
            var now = new Date
            var hoje= '2020-04-03T00:00:00.000Z'


              // Add another car
              openRealm.write(() => {
                const mysearch = openRealm.create('Aponts', {
                    id_user: dataHome.id, 
                    id_car: dataHome.id_carro,
                    km_inicial: km_init,
                    km_final: 0,
                    data: hoje,
                    local: obs
                    });
                });

                setArray([{
                    "id_user": dataHome.id, 
                    "id_car": dataHome.id_carro,
                    "km_inicial": km_init,
                    "km_final": 0,
                    "data": hoje,
                    "local": obs
                    }])


                setKmInicial('');
                setObs('');
                setIni_viagem(false)
                setViagemAberta(true)


                alert('Viagem iniciada com sucesso !')
            

            // Remember to close the realm when finished.
            // realm.close();


       
    }
    // ------------------------------------------------

    useEffect(() => {
      console.log(array)
    }, [array])


    useLayoutEffect(() => {

        // =----------------------------------------
        async function getNet() {
            await NetInfo.fetch().then(state => {
                connected= state.isConnected;
            });
            
            }
    
            getNet();
        // --------------------------------------------------------

        console.log('passei pelo DB')
        async function openDB() {
            openRealm = await Realm.open({path: 'projetox.realm'}) 
            
            const u = openRealm.objects('Person');
            const y = openRealm.objects('Aponts');
            
            console.log(u)

            dataH.id= u[0].id
            dataH.nome= u[0].nome
            dataH.usuario= u[0].usuario
            dataH.senha= u[0].senha
            
            dataH.id_carro= u[0].id_carro
            dataH.carro= u[0].carro
            dataH.placa= u[0].placa
            dataH.cor= u[0].cor
            dataH.foto= u[0].foto

            if(y.length>0) {
            var ultimo= y[y.length - 1];

            var n = [{"data": ultimo.data, "id_car": ultimo.id_car, "id_user": ultimo.id_user, "km_final": ultimo.km_final, "km_inicial": ultimo.km_inicial, "local": ultimo.local}];
            
            console.log(n)
            if(ultimo.km_final === 0) {
                setViagemAberta(true)
                setArray(n)
            }
            }

            setDataHome(dataH)

            console.log(y)

            setBuscaUltimo(true)
        }

        setTimeout(() => {
            openDB()
            console.log(array)

        }, 1000);

    }, [])

    
    return (
        <ScrollView style={{flex: 1}}>

        <View style={styles.container}>

            <View style={styles.box1}>
                <View style={styles.infoNome}><Text style={{fontSize: 38}}>🚦‍</Text><Text style={{fontWeight: '700'}}>{dataHome.nome}</Text></View> 
                <View style={styles.infoCarro}><Text style={{fontSize: 38}}>🚗</Text><Text style={{fontWeight: '700'}}>{dataHome.carro}</Text><Text style={{fontWeight: '700'}}>PLACA: {dataHome.placa}</Text></View>
            </View>

            {!viagem_aberta ?
            <TouchableOpacity style={styles.abrir} onPress={() => setIni_viagem(true)}><Text style={styles.textAbrir}> + ABRIR NOVA CORRIDA</Text></TouchableOpacity>
            :
            <>
            <Text><Text style={{fontSize: 26}}>🚧</Text> Atenção! Finalize sua viagem.</Text>
            </>
            }

            {ini_viagem ?
            <>
            <View style={styles.novaCorrida}>
                <TextInput style={styles.input} placeholder="Kilometragem atual do veículo" keyboardType="decimal-pad" onChangeText={(e)=> setKmInicial(e)} />
                <TextInput style={styles.input} placeholder="Destino do motorista" onChangeText={(e)=> setObs(e)} />

                <TouchableOpacity style={styles.botao} onPress={saveApont}>
                    <Text style={{fontWeight: '600'}}>SALVAR</Text>
                </TouchableOpacity>
            </View>
            </>
            :
            <>
            </>
            }
           {array.map((item, index)=> {
               
               return(
                   
                   <View key={index} style={styles.listAponts}>
                       <Text style={{fontWeight: '700', fontSize:22}}>🚗  {dataHome.carro}</Text>
                       <Text><Text style={{fontWeight: '700', fontSize:18}}>🎟️   </Text> {dataHome.placa}</Text>
                       <View style={{height: 1, flex:1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 10}}></View>
                       <Text><Text style={{fontWeight: '700', fontSize:18}}>🛣️   </Text> {item.km_inicial}</Text>
                       <Text><Text style={{fontWeight: '700', fontSize:18}}>📌   </Text> {item.local}</Text>
                       <View style={{height: 1, flex:1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 10}}></View>

                       <Text style={{marginBottom: 20}}><Text style={{fontWeight: '700', fontSize:18}}>🗺️   </Text> <Text style={{color: 'green'}}>ABERTA</Text></Text>
                       {(item.km_final === 0)? 
                       <Button title="Finalizar" onPress={() => setModalVisible(true)} /> : <></>}
                   </View>
               )
            })}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={styles.modal}
            >
                <View style={{backgroundColor: '#F6f6f6', flex: 1}}>
                <View style={styles.viewModal}>
                    <Text>Digite a kilometragem apontada !</Text>
                    <Text onPress={()=> setModalVisible(false)} style={styles.close}>❌</Text>
                    <TextInput style={styles.inputModal} onChangeText={(e)=> setKmFinal(e)} placeholder="Digite a KM final" keyboardType="numeric" />
                    <Button title="Encerrar" onPress={()=> encerraViagem()} />
                </View>
                {encerrando &&
                <>
                <LottieView
               source={require("../assets/animations/loader.json")}
               autoPlay
               speed={1.5}
               loop
               style={{backgroundColor: '#FFF', maxHeight:'100%'}}
               />
               <Text style={{textAlign:'center', marginTop: 80}}>FINALIZANDO SUA VIAGEM</Text>
               </>
                }
                </View>
            </Modal>
            
        </View>
        </ScrollView>
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
        width: 250,
        height: 60,
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f6f6f6'
    },
    botao: {
        width: 100,
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#FA624F',
        borderRadius: 5
    },
    infoCarro: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
        backgroundColor: '#D4FFD5' 
        
    },
    infoNome: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FAF47A',
        padding: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    },
    listAponts: {
        width: 300,
        marginTop: 20,
        marginBottom: 100,
        justifyContent: "center",
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    },
    modal: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    viewModal: {
        marginTop: '50%',
        width: '90%',
        marginLeft: '5%',
        backgroundColor:'#FFF',
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#CCC',
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 20,
        fontSize:20
    },
    inputModal: {
        backgroundColor: '#f4f4f4',
        height: 40,
        marginTop: 30,
        marginBottom: 10
    },
    abrir: {
        backgroundColor: '#B1E4FA',
        height: 40,
        width: 200,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 3,
    },
    textAbrir: {
        fontWeight: '700',
        color: '#000'
    },
    novaCorrida: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 3,
    }
})