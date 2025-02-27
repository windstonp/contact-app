import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/src/validators/contact-schema";
import { IContactDto } from "@/src/dtos/contact-dto";
import ControlledInput from "@/src/components/ControlledInput";
import { Button } from "react-native-paper";
import { invalidateQuery } from "@/src/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { createContact } from "@/src/data/contact-querys";
import { QueryKeys } from "@/src/constants/query-keys";
import { useSnackbar } from "@/src/context/useSnackbar";
import { router } from "expo-router";
export default function CreateContact() {
  const { showSnackbar } = useSnackbar();

  const createContactMutation = useMutation({
    mutationFn: createContact,
    mutationKey: [QueryKeys.CONTACTS],
    onSuccess: () => {
      invalidateQuery(QueryKeys.CONTACTS);
      showSnackbar("Contato criado com sucesso! ✅");
      router.navigate("/(contacts)");
    },
    onError: () => {
      showSnackbar("Erro ao criar contato! ❌");
    },
  });

  const { control, handleSubmit } = useForm<IContactDto>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: IContactDto) => {
    createContactMutation.mutate(data);
  };
  return (
    <View style={styles.container}>
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
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
