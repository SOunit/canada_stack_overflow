import { StyleSheet, Text, View } from "react-native";
import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./store/reducers/auth";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({ auth: authReducer });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
