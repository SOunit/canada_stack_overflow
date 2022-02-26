import { Fragment, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  getAuth,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useEffect } from "react";
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native";

const Setting: NavigationStackScreenComponent = () => {
  const [user, setUser] = useState<FirebaseUser | null>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [testText, setTestText] = useState<string>("test text");
  const [isFirebaseUpdated, setIsFirebaseUpdated] = useState<boolean>(false);

  const emailChangeHandler = (email: string) => {
    setEmail(email);
    setTestText("email change");
  };

  const passwordChangeHandler = (password: string) => {
    setPassword(password);
  };

  const updateHandler = async () => {
    try {
      const promises = [];
      promises.push(updateEmail(user!, email));
      if (password) {
        promises.push(updatePassword(user!, password));
      }

      Promise.all(promises)
        .then(() => {
          setIsFirebaseUpdated(true);

          // currentUser looks updated, but this doesn't work
          // console.log(getAuth().currentUser);
          // setUser(getAuth().currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("setting updateHandler");
      console.log(err);
    }
  };

  useEffect(() => {
    // to detect firebase update
    if (isFirebaseUpdated) {
      console.log("firebase updated");
      setUser(getAuth().currentUser);

      setIsFirebaseUpdated(false);
    }
  }, [isFirebaseUpdated]);

  // https://reffect.co.jp/react/react-native-firebase#i-3
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email!);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      <View>
        <Text>Email</Text>
        <Input value={email} onChangeText={emailChangeHandler} />
        <Text>Password</Text>
        <Input value={password} onChangeText={passwordChangeHandler} />
        <Button color="black" onPress={updateHandler} title="Update" />
      </View>
      <View>
        <Text>{user ? user.email : "no user"}</Text>
        <Text>{testText}</Text>
      </View>
    </Fragment>
  );
};

export default Setting;
