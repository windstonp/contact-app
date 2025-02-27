import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/src/validators/contact-schema";
import { IContactDataObject, IContactDto } from "@/src/dtos/contact-dto";
import ControlledInput from "@/src/components/ControlledInput";
import { Button, ActivityIndicator } from "react-native-paper"; // Importando ActivityIndicator
import { invalidateQuery } from "@/src/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getContactById, updateContact } from "@/src/data/contact-querys";
import { QueryKeys } from "@/src/constants/query-keys";
import { useSnackbar } from "@/src/context/useSnackbar";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

interface IEditContactProps {
  readonly contact: IContactDataObject;
}

export default function EditContact() {
  const { id } = useLocalSearchParams();
  const { showSnackbar } = useSnackbar();

  const { data: contact, isLoading } = useQuery({
    queryFn: () => getContactById(id),
    queryKey: [QueryKeys.CONTACTBYID, id],
    refetchOnMount: true,
  });

  const editContactMutation = useMutation({
    mutationFn: updateContact,
    mutationKey: [QueryKeys.CONTACTS],
    onSuccess: () => {
      invalidateQuery(QueryKeys.CONTACTS);
      showSnackbar("Contato Editado com sucesso! ✅");
      router.navigate("/(contacts)");
    },
    onError: () => {
      showSnackbar("Erro ao editar contato! ❌");
    },
  });

  const { control, handleSubmit, setValue } = useForm<IContactDto>({
    resolver: yupResolver(contactSchema),
  });

  useEffect(() => {
    if (!isLoading && contact && contact.length > 0) {
      setValue("name", contact[0].name);
      setValue("phone", contact[0].phone);
      setValue("email", contact[0].email);
    }
  }, [isLoading, contact]);

  const onSubmit = (data: IContactDto) => {
    if (contact) {
      editContactMutation.mutate({ id: contact[0].id, updatedContact: data });
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      ) : (
        <>
          <ControlledInput control={control} label="Nome" name="name" />
          <ControlledInput
            control={control}
            label="Email"
            name="email"
            keyboardType="email-address"
          />
          <ControlledInput
            control={control}
            label="Telefone"
            name="phone"
            keyboardType="phone-pad"
            max={15}
            maskPattern="(99) 99999-9999"
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Atualizar
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6200EE",
  },
});
