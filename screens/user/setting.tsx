import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useEffect } from "react";

const Setting: NavigationStackScreenComponent = () => {
  const [user, setUser] = useState<FirebaseUser | null>();

  // https://reffect.co.jp/react/react-native-firebase#i-3
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log("user", user);
  console.log("getAuth()", getAuth());

  return (
    <View>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default Setting;
