import { token } from "@/localization/appStructure";
import { translate } from "@/localization/config";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { useFirebaseAuthentication } from "../../hooks/useFirebaseAuthentication";
import { Input } from "./components/input";
import { Navigation } from "./components/navigation";

const SigninPage = () => {
  const { login, isBusy } = useFirebaseAuthentication();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    login(email, password);
  });
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: translate(token.errors.emailFormat),
            },
            required: translate(token.errors.required),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.email?.message || ""}
              label={translate(token.common.email)}
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
            required: translate(token.errors.required),

            pattern: {
              value: /^.{6,}$/,
              message: translate(token.errors.passwordFormat),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              error={errors.password?.message || ""}
              label={translate(token.common.password)}
              value={value}
              onBlur={onBlur}
              autoCapitalize="none"
              secureTextEntry
              keyboardType="default"
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        <Button title={translate(token.common.login)} onPress={onSubmit} />
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
