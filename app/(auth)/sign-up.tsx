import { token } from "@/localization/appStructure";
import { translate } from "@/localization/config";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      nationalId: "",
      phoneNumber: "",
      dateOfBirth: moment().toDate(),
    },
  });

  const onSubmit = handleSubmit(
    async ({ firstName, lastName, email, password }) => {
      await register(firstName, lastName, email, password);
    }
  );
  /*

  
*/
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
      <KeyboardAvoidingView
        style={styles.form}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      >
        <ScrollView style={{ width: "100%" }}>
          <View style={[styles.form, { paddingTop: 30 }]}>
            <Controller
              control={control}
              rules={{
                required: translate(token.errors.required),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={errors.firstName?.message || ""}
                  label={translate(token.screens.registerScreen.firstName)}
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
                required: translate(token.errors.required),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={errors.lastName?.message || ""}
                  label={translate(token.screens.registerScreen.lastName)}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="lastName"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={""}
                  label={translate(token.screens.registerScreen.phoneNumber)}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="phoneNumber"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={""}
                  label={translate(token.screens.registerScreen.nationalId)}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="nationalId"
            />

            {Platform.OS === "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginTop: 10,
                  marginBottom: 10,
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      alignSelf: "flex-start",

                      fontWeight: "bold",
                    }}
                  >
                    {translate(token.screens.registerScreen.dateOfBirth)}
                  </Text>
                </View>

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <RNDateTimePicker
                      mode="date"
                      value={value}
                      onChange={(_, selectedDate) => {
                        onChange(selectedDate);
                      }}
                    />
                  )}
                  name="dateOfBirth"
                />
              </View>
            )}

            {Platform.OS === "android" && (
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginTop: 10,
                  marginBottom: 10,
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      alignSelf: "flex-start",

                      fontWeight: "bold",
                    }}
                  >
                    {translate(token.screens.registerScreen.dateOfBirth)}
                  </Text>
                </View>

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable
                      onPress={() => {
                        DateTimePickerAndroid.open({
                          mode: "date",
                          value: moment().toDate(),
                          onChange: (event, selectedDate) => {
                            if (selectedDate)
                              setValue("dateOfBirth", selectedDate);
                          },
                        });
                      }}
                      style={{
                        padding: 10,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ color: "black" }}>
                        {moment(value).format("yyyy-MM-DD")}
                      </Text>
                    </Pressable>
                  )}
                  name="dateOfBirth"
                />
              </View>
            )}

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
                validate: {
                  emailMatch: (value) => {
                    const { email } = getValues();

                    return (
                      value.trim().toLowerCase() ===
                        email.trim().toLowerCase() ||
                      translate(token.errors.emailNotMatch)
                    );
                  },
                },
                required: translate(token.errors.required),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={errors.confirmEmail?.message || ""}
                  label={translate(token.screens.registerScreen.confirmEmail)}
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
                required: translate(token.errors.required),
                validate: {
                  passwordMatch: (value) => {
                    const { password } = getValues();
                    return (
                      value === password ||
                      translate(token.errors.passwordNotMatch)
                    );
                  },
                },
                pattern: {
                  value: /^.{6,}$/,
                  message: translate(token.errors.passwordNotMatch),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  error={errors.confirmPassword?.message || ""}
                  label={translate(
                    token.screens.registerScreen.confirmPassword
                  )}
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry
                  keyboardType="default"
                  onChangeText={onChange}
                />
              )}
              name="confirmPassword"
            />

            <Button
              title={translate(token.common.register)}
              onPress={onSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
