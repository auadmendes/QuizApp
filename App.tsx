import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ActivityIndicator} from 'react-native';
import colors from './src/Styles/colors';
import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_100Thin,
 } from '@expo-google-fonts/roboto';
import Quiz from './src/screens/Quiz';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_100Thin,
  });
  if(!fontsLoaded)
  return <ActivityIndicator size="large" color={colors.purple}/>

  return (
    <Quiz />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
