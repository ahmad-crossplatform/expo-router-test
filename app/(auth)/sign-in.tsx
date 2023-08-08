import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { Link } from "expo-router";
import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";
import { Navigation } from "./components/navigation";
import { Input } from "./components/input";

const SigninPage = () => {
  const { login, isBusy } = useFirebaseAuthentication();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignin = () => {
    // Perform signin logic here
    console.log("Signing in with email:", email, "and password:", password);
    login(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <View style={styles.form}>
        <Input
          error=""
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Input
          error=""
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" onPress={handleSignin} />
        <ActivityIndicator animating={isBusy} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SigninPage;
