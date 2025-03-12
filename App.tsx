// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import SignUpScreen from './screens/SignUpScreen';
import PixCodeScreen from './screens/PixCodeScreen';
import HomePage from './screens/HomePage';

export type RootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
  PixCode: { fullName: string; username: string; dob: string } | undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: 'Sign Up' }} />
        <Stack.Screen name="PixCode" component={PixCodeScreen} options={{ headerTitle: 'Pix Code' }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
