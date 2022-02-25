import { useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/action-creators/auth";
import { FIREBASE_API_KEY } from "@env";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import ErrorModal from "../../components/common/ErrorModal";

const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";

interface formState {
  email?: string;
  password?: string;
}

interface formAction {
  type: string;
  text: string;
}

const AuthScreen: NavigationStackScreenComponent = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [form, formDispatch] = useReducer(
    (state: formState, action: formAction) => {
      // if (action.text.trim.length === 0) {
      //   setIsEmpty(true);
      // }

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
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
      if (isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
      }

      const response = await fetch(url, {
        method: "POST",
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

      dispatch(authActions.authenticate(resData.idToken, resData.localId));

      props.navigation.navigate("Home");
    } catch (err) {
      console.log("Error in AuthScreen");
      console.log(err.message);
      setError(true);
    }
  };

  const emailChangeHandler = (text: string) => {
    formDispatch({ type: UPDATE_EMAIL, text });
  };

  const passwordChangeHandler = (text: string) => {
    formDispatch({ type: UPDATE_PASSWORD, text });
  };

  const removeHandler = () => {
    setError(false);
  };

  return (
    <View style={styles.screen}>
      {error && (
        <ErrorModal text="Something went wrong!" onRemove={removeHandler} />
      )}
      <Card containerStyle={{ width: "85%" }}>
        <Card.Title>{isSignUp ? "Sign Up" : "Login"}</Card.Title>
        <Card.Divider />
        {/* {isEmpty && <p>don't leave email or password blank</p>} */}
        <Input
          autoCompleteType="off"
          placeholder="Email"
          value={form.email}
          onChangeText={emailChangeHandler}
        />
        <Input
          autoCompleteType="off"
          placeholder="Password"
          value={form.password}
          secureTextEntry
          onChangeText={passwordChangeHandler}
        />
        <Button title={isSignUp ? "Sign Up" : "Login"} onPress={authHandler} />
        <Button
          title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
          type="outline"
          containerStyle={{ marginVertical: 20 }}
          onPress={() => {
            setIsSignUp((prevState) => !prevState);
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
