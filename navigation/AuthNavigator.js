import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/user/AuthScreen";

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

export default AuthNavigator;
