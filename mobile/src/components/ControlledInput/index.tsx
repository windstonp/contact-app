import React from "react";
import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";
import { mask } from "react-native-mask-text";

interface ControlledInputProps {
  control: any;
  name: string;
  label: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  maskPattern?: string;
  max?: number;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  label,
  keyboardType = "default",
  maskPattern,
  max = undefined,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const maskedValue = maskPattern ? mask(value, maskPattern) : value;
        return (
          <View style={styles.container}>
            <TextInput
              label={label}
              value={maskedValue}
              onChangeText={onChange}
              keyboardType={keyboardType}
              mode="flat"
              maxLength={max}
              error={!!error}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});

export default ControlledInput;
