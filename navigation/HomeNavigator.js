import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/homeScreen";

const HomeNavigator = createStackNavigator({ Home: HomeScreen });

export default HomeNavigator;
