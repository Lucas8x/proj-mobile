import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../screens/login';
import { Main } from '../screens/main';
import { Profile } from '../screens/profile';
import { NewPost } from '../screens/newpost';
import { SingUp } from '../screens/signup';

const Stack = createStackNavigator();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={SingUp} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen
        name='Profile'
        component={Profile}
        initialParams={{ user_id: 1 }}
      />
      <Stack.Screen name='NewPost' component={NewPost} />
    </Stack.Navigator>
  </NavigationContainer>
);
