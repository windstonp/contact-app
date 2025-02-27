import { IContactDataObject } from "@/src/dtos/contact-dto";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Avatar, Card, useTheme, IconButton } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { deleteContact } from "@/src/data/contact-querys";
import { QueryKeys } from "@/src/constants/query-keys";
import { invalidateQuery } from "@/src/lib/react-query";
import { useRouter } from "expo-router";

interface Props {
  contact: IContactDataObject;
}

const ContactItem: React.FC<Props> = ({ contact }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    mutationKey: [QueryKeys.CONTACTS],
    onSuccess: () => {
      invalidateQuery(QueryKeys.CONTACTS);
    },
  });

  const handlePress = () => setExpanded(!expanded);

  return (
    <Card style={styles.card}>
      <List.Accordion
        title={contact.name}
        left={() => (
          <Avatar.Text
            size={40}
            label={contact.name[0]}
            style={styles.avatar}
          />
        )}
        expanded={expanded}
        onPress={handlePress}
        titleStyle={styles.title}
        style={[
          styles.accordion,
          expanded && { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            onPress={() => {
              router.navigate({
                pathname: "/(contacts)/edit/[id]",
                params: {
                  id: contact.id,
                },
              });
            }}
            mode="contained-tonal"
          />
          <IconButton
            icon="delete"
            onPress={() => {
              deleteContactMutation.mutate(contact.id);
            }}
            mode="contained-tonal"
          />
        </View>
        <View style={styles.details}>
          <List.Item title="Telefone" description={contact.phone} />
          <List.Item title="E-mail" description={contact.email} />
        </View>
      </List.Accordion>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  accordion: {
    padding: 10,
  },
  avatar: {
    backgroundColor: "#6200ea",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ContactItem;
