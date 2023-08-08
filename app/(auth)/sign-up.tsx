import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import { Link } from "expo-router";
import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";

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
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Link href="/sign-in">Login</Link>

        <Link style={{ fontWeight: "bold" }} href="/sign-up">
          Register
        </Link>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Email"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupPage;
