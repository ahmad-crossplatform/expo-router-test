import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import { Link } from "expo-router";
import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "./components/input";
import { Navigation } from "./components/navigation";

const SignupPage = () => {
  const { register } = useFirebaseAuthentication();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignup = () => {
    // Perform signup logic here
    if (!firstName || !lastName) {
      console.log("Please enter your full name");
      return;
    }

    if (!email || email !== confirmEmail) {
      console.log(
        "Please enter a valid email address and confirm it correctly"
      );
      return;
    }

    if (!password || password !== confirmPassword) {
      console.log("Please enter a valid password and confirm it correctly");
      return;
    }

    console.log("Signing up with:", {
      firstName,
      lastName,
      email,
      password,
    });

    register(firstName, lastName, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <View style={styles.form}>
        <Input
          error=""
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          error=""
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          error=""
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          error=""
          label="Confirm Email"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
          keyboardType="email-address"
        />
        <Input
          error=""
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          error=""
          label="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Sign Up" onPress={handleSignup} />
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
});

export default SignupPage;
