import {} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./auth-navigator";
import HomeDrawerNavigator from "./home-drawer-navigator";

const MainNavigator = createSwitchNavigator({
  Home: HomeDrawerNavigator,
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
