import { StyleSheet } from "react-native";
import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./store/reducers/auth";
import postsReducer from "./store/reducers/posts";
import postKeyReducer from "./store/reducers/postKey";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import NavigationContainer from "./navigation/NavigationContainer";
import initFirebase from "./init-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  postKey: postKeyReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

initFirebase();

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
