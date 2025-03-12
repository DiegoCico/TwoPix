// screens/SignUpScreen.tsx
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { auth, firestore } from '../firebase'; // Changed from './firebase' to '../firebase'

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

// A fun animated circle component that continuously pulsates
const AnimatedCircle: React.FC<{ style?: object }> = ({ style }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={[styles.circle, style, { transform: [{ scale: scaleAnim }] }]} />
  );
};

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [formOpacity]);

  const handleSignUp = () => {
    if (!fullName || !username || !dob || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return firestore().collection('users').doc(uid).set({
          fullName,
          username,
          dob,
          email,
        });
      })
      .then(() => {
        navigation.navigate('PixCode', { fullName, username, dob });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* Animated circles for a playful background */}
      <AnimatedCircle style={styles.circleOne} />
      <AnimatedCircle style={styles.circleTwo} />

      <Animated.View style={[styles.overlay, { opacity: formOpacity }]}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          placeholderTextColor="#ccc"
          value={dob}
          onChangeText={setDob}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
    padding: 20,
    backgroundColor: 'rgba(18,18,18,0.8)',
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    color: '#FF69B4',
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P', // Pixelated font for a playful look
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: 15,
    backgroundColor: 'rgba(30,30,30,0.8)',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#FF69B4',
    opacity: 0.3,
    borderRadius: 100,
  },
  circleOne: {
    width: 150,
    height: 150,
    top: 50,
    left: 20,
  },
  circleTwo: {
    width: 100,
    height: 100,
    bottom: 100,
    right: 30,
  },
});

export default SignUpScreen;
