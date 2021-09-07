import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../screens/login';
import { Main } from '../screens/main';
import { Profile } from '../screens/profile';

const Stack = createStackNavigator();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
);
