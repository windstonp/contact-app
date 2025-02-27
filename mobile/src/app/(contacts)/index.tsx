import ContactItem from "@/src/components/ContactItem";
import FabComponent from "@/src/components/FAB";
import { QueryKeys } from "@/src/constants/query-keys";
import { getContacts } from "@/src/data/contact-querys";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { usePathname } from "expo-router";

export default function HomeScreen() {
  const pathname = usePathname();
  const showFab = pathname === "/";
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.CONTACTS],
    queryFn: () => getContacts(searchQuery),
  });

  React.useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);
  return (
    <View style={[styles.container]}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {showFab && <FabComponent />}
      <View style={[styles.container, { padding: 0 }]}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ContactItem contact={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    margin: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
