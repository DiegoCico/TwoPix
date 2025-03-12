import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import AuthScreen from './screens/AuthScreen';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView style={styles.container}>
        <AuthScreen />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
