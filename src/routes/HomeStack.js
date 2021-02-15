import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import PokemonProfile from '../screens/PokemonProfile';

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
    <Stack.Screen name="PokemonProfile" component={PokemonProfile} />
  </Stack.Navigator>
)

export default HomeStack;