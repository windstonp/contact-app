import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Contatos",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "Cadastrar Contato",
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          headerTitle: "Editar Contato",
        }}
      />
      <Stack.Screen name="index" />
    </Stack>
  );
}
