import { Platform, TouchableOpacity } from "react-native";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import defaultNavOptions from "./default-nav-options";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { SETTING, UPDATE_SETTING } from "../constants/screen-names";
import MenuButton from "../components/organisms/menu-button";
import Setting from "../screens/user/setting";

const UserStackNavigator = createStackNavigator(
  {
    [SETTING]: {
      screen: Setting,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Post List",
          headerLeft: () => MenuButton(navigation),
          headerRight: () => (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => navigation.navigate(UPDATE_SETTING)}
            >
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            </TouchableOpacity>
          ),
        };
      },
    },
    [UPDATE_SETTING]: {
      screen: Setting,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Post List",
          headerLeft: () => MenuButton(navigation),
          headerRight: () => (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => navigation.navigate("CreatePost")}
            >
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            </TouchableOpacity>
          ),
        };
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

export default UserStackNavigator;
