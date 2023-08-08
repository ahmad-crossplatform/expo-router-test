import { StyleSheet, View } from "react-native";
import React from "react";
import { Link, useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

export const Navigation = () => {
  const { name } = useRoute();

  return (
    <View style={styles.navigation}>
      <Link
        style={{ fontWeight: name == "(auth)/sign-in" ? "bold" : "normal" }}
        href="/sign-in"
      >
        Login
      </Link>

      <Link
        style={{ fontWeight: name == "(auth)/sign-up" ? "bold" : "normal" }}
        href="/sign-up"
      >
        Register
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 10,
    marginLeft: 50,
  },
});
