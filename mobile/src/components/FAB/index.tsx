import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB as Fab, Portal } from "react-native-paper";
import { router } from "expo-router";

const FabComponent = () => {
  return (
    <Portal>
      <Fab
        visible
        icon="plus"
        onPress={() => {
          router.navigate("/(contacts)/create");
        }}
        style={[styles.fabStyle]}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export default FabComponent;
