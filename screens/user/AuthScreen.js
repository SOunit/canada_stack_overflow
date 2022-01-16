import { useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import env from "../../env";
import * as authActions from "../../store/actions/auth";

const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, formDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case UPDATE_EMAIL: {
          return { ...state, email: action.text };
        }
        case UPDATE_PASSWORD: {
          return { ...state, password: action.text };
        }
        default:
          return state;
      }
    },
    {
      email: "test@test.com",
      password: "password",
    }
  );
  const dispatch = useDispatch();

  const authHandler = async () => {
    try {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebaseApiKey}`;
      if (isSignup) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.firebaseApiKey}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: "application/json",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Error in AuthScreen");
      }

      const resData = await response.json();
      console.log(resData);

      dispatch(authActions.authenticate(resData.idToken, resData.localId));

      props.navigation.navigate("Home");
    } catch (err) {
      console.log("Error in AuthScreen");
      console.log(err.message);
    }
  };

  const emailChangeHandler = (text) => {
    formDispatch({ type: UPDATE_EMAIL, text });
  };

  const passwordChangeHandler = (text) => {
    formDispatch({ type: UPDATE_PASSWORD, text });
  };

  return (
    <View style={styles.screen}>
      <Card containerStyle={{ width: "85%" }}>
        <Card.Title>{isSignup ? "Sign Up" : "Login"}</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Email"
          value={form.email}
          onChangeText={emailChangeHandler}
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          secureTextEntry
          onChangeText={passwordChangeHandler}
        />
        <Button title={isSignup ? "Sign Up" : "Login"} onPress={authHandler} />
        <Button
          title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
          type="outline"
          containerStyle={{ marginVertical: 20 }}
          onPress={() => {
            setIsSignup((prevState) => !prevState);
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AuthScreen;
