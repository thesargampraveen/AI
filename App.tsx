import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tabnavigation from './src/navigation/Tabnavigation';


const App = () => {
  return (
    <View style={styles.container}>
      <Tabnavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ This ensures the navigator fills the screen and tab bar stays at bottom
  },
});

export default App;
