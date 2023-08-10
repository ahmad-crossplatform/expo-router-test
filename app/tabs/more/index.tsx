import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useFirebaseAuthentication } from "@/hooks/useFirebaseAuthentication";
import { useProfile } from "@/hooks/useProfile";
import moment from "moment";

export default function TabTwoScreen() {
  const { logout } = useFirebaseAuthentication();
  const { profile } = useProfile();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {profile?.firstName} {profile?.lastName}
      </Text>
      <Text style={styles.info}>Email: {profile?.email}</Text>
      <Text style={styles.info}>
        National ID: {profile?.socialSecurityNumber}
      </Text>
      <Text style={styles.info}>Phone: {profile?.phoneNumber}</Text>
      <Text style={styles.info}>
        Date of birth:{" "}
        {moment(profile?.dateOfBirth).format("DD/MM/YYYY").toString()}
      </Text>
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
  info: {
    textAlign: "left",
    width: "100%",
    paddingStart: 15,
  },
  title: {
    textAlign: "left",
    width: "100%",
    paddingStart: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
