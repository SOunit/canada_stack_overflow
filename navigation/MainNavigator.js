import {} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/homeScreen";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const MainNavigator = createSwitchNavigator({
  Home: HomeNavigator,
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
