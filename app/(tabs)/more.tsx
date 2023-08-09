import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";

export default function TabTwoScreen() {
  const { user, logout } = useFirebaseAuthentication();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.displayName}</Text>
      <Text style={styles.info}>{user?.email}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
