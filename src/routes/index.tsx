import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Login } from '../screens/login';
import { Main } from '../screens/main';
import { Profile } from '../screens/profile';
import { NewPost } from '../screens/newpost';
import { SingUp } from '../screens/signup';
import { Comments } from '../screens/comments';

const Stack = createStackNavigator();

const InitialScreen = () => {
  const nav = useNavigation();
  firebase
    .auth()
    .onAuthStateChanged((user) =>
      nav.navigate((user == null ? 'Login' : 'Main') as never, {} as never)
    );

  return <View />;
};

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Initial' component={InitialScreen} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={SingUp} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen
        name='Profile'
        component={Profile}
        initialParams={{ user_id: 1 }}
      />
      <Stack.Screen name='NewPost' component={NewPost} />
      <Stack.Screen name='Comments' component={Comments} />
    </Stack.Navigator>
  </NavigationContainer>
);
