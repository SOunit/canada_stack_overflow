import { StyleSheet } from "react-native";
import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./store/reducers/auth";
import postsReducer from "./store/reducers/posts";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import NavigationContainer from "./navigation/navigation-container";
import firebaseApp from "./firebase-app";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
