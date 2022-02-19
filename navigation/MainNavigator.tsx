import {} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import HomeDrawerNavigator from "./HomeDrawerNavigator";

const MainNavigator = createSwitchNavigator({
  Home: HomeDrawerNavigator,
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
