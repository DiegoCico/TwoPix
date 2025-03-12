import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the logo fade-in on component mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        // You can navigate to your main app screen here
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.logo}>TwoPix</Text>
      </Animated.View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    color: 'pink',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
