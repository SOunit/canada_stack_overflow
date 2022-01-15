import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "react-native-elements";

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <View style={styles.screen}>
      <Card containerStyle={{ width: "85%" }}>
        <Card.Title>{isSignup ? "Sign Up" : "Login"}</Card.Title>
        <Card.Divider />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button title={isSignup ? "Sign Up" : "Login"} />
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
