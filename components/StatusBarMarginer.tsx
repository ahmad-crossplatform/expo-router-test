import Constants from "expo-constants";
import React from "react";
import { View } from "react-native";

export const StatusBarMarginer: React.FC<{ color?: string }> = ({ color }) => {
  const STATUSBAR_HEIGHT = Constants.statusBarHeight;
  return (
    <View
      style={{
        height: STATUSBAR_HEIGHT,
        marginTop: STATUSBAR_HEIGHT,
      }}
    ></View>
  );
};
