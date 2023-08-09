import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to your home page!</Text>
      <Link href="/tabs/dashboard/newsDetails">
        <Text>Go to news details</Text>
      </Link>
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
