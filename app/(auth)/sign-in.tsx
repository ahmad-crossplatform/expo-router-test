import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Link } from "expo-router";
import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";

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
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Link style={{ fontWeight: "bold" }} href="/sign-in">
          Login
        </Link>

        <Link href="/sign-up">Register</Link>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" onPress={handleSignin} />
        <ActivityIndicator animating={isBusy} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 10,
    marginLeft: 50,
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
