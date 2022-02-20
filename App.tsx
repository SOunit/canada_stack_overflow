import { StyleSheet } from "react-native";

import { Provider } from "react-redux";
import NavigationContainer from "./navigation/navigation-container";
import firebaseApp from "./firebase-app";
import { store } from "./store/store";

firebaseApp.init();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
