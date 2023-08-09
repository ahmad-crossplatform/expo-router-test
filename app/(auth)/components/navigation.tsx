import { StatusBarMarginer } from "@/components/StatusBarMarginer";
import { token } from "@/localization/appStructure";
import { translate } from "@/localization/config";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export const Navigation = () => {
  const { name } = useRoute();

  return (
    <View style={{ width: "100%" }}>
      {Platform.OS === "android" && <StatusBarMarginer />}
      <View style={styles.navigation}>
        <Link
          style={{ fontWeight: name == "(auth)/sign-in" ? "bold" : "normal" }}
          href="/sign-in"
        >
          {translate(token.common.login)}
        </Link>

        <Link
          style={{ fontWeight: name == "(auth)/sign-up" ? "bold" : "normal" }}
          href="/sign-up"
        >
          {translate(token.common.register)}
        </Link>
      </View>
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
