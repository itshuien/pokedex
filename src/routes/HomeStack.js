import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import PokemonDetails from '../screens/PokemonDetails';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerTransparent: true,
      cardStyle: { backgroundColor: '#ffffff' }
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
  </Stack.Navigator>
)

export default HomeStack;