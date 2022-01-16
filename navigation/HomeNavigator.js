import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator } from "react-navigation-stack";
import CustomHeaderButton from "../components/common/CustomHeaderButton";
import HomeScreen from "../screens/HomeScreen";
import defaultNavOptions from "./defaultNavOptions";

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: (navData) => {
        return {
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

export default HomeNavigator;
