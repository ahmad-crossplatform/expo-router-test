import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFirebaseAuthentication } from "../hooks/useFirebaseAuthentication";
import { Input } from "./components/input";
import { Navigation } from "./components/navigation";

const SignupPage = () => {
  const { register } = useFirebaseAuthentication();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(
    async ({ firstName, lastName, email, password }) => {
      await register(firstName, lastName, email, password);
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: "Required *",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.firstName?.message || ""}
              label="First Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{
            required: "Required *",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.lastName?.message || ""}
              label="Last Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="lastName"
        />

        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Please enter a valid email address",
            },
            required: "Required *",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.email?.message || ""}
              label="Email"
              value={value}
              onBlur={onBlur}
              keyboardType="email-address"
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            validate: {
              emailMatch: (value) => {
                const { email } = getValues();

                return (
                  value.trim().toLowerCase() === email.trim().toLowerCase() ||
                  "Emails do not match"
                );
              },
            },
            required: "Required *",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.confirmEmail?.message || ""}
              label="Confirm Email"
              value={value}
              onBlur={onBlur}
              keyboardType="email-address"
              onChangeText={onChange}
            />
          )}
          name="confirmEmail"
        />
        <Controller
          control={control}
          rules={{
            required: "Required *",

            pattern: {
              value: /^.{6,}$/,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.password?.message || ""}
              label="Password"
              value={value}
              onBlur={onBlur}
              secureTextEntry
              keyboardType="default"
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: "Required *",
            validate: {
              passwordMatch: (value) => {
                const { password } = getValues();
                return value === password || "Passwords do not match";
              },
            },
            pattern: {
              value: /^.{6,}$/,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.confirmPassword?.message || ""}
              label="Confirm Password"
              value={value}
              onBlur={onBlur}
              secureTextEntry
              keyboardType="default"
              onChangeText={onChange}
            />
          )}
          name="confirmPassword"
        />
        <Button title="Sign Up" onPress={onSubmit} />
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
