import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to news Details!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomePage;
