import {} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthScreen from "../screens/user/AuthScreen";

const MainNavigator = createSwitchNavigator({
  Auth: AuthScreen,
});

export default createAppContainer(MainNavigator);
