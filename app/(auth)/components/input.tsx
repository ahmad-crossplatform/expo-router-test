import React from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;

  error: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error !== "" && styles.errorInput]}
        {...props}
      />
      {error && error !== "" && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
