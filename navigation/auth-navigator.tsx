import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/user/AuthScreen";
import defaultNavOptions from "./default-nav-options";

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    navigationOptions: { headerTitle: "Job Stack Overflow" },
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default AuthNavigator;
