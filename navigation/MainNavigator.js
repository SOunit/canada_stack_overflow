import {} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./AuthNavigator";

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
