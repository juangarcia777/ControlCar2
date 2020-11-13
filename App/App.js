import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {CarSchema, PersonSchema, ApontsSchema, AccessSchema} from './src/schemas';

import Login from './src/pages/Login'
import Home from './src/pages/Home'

export default function App() {

  const Stack = createStackNavigator();

  useEffect(()=> {
    Realm.open({path: 'projetox.realm',schema: [ PersonSchema, CarSchema,ApontsSchema, AccessSchema]})
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{
          headerTitleAlign:'center',
          title: 'LOGIN',
          headerStyle: {
            height: 100,
            backgroundColor: '#B1E4FA',
          },
          headerTitleStyle: {
            fontSize: 32,
            color: '#545454',
          }
        }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
  </NavigationContainer>
  )
}
