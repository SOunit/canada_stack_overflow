import { createStackNavigator } from "react-navigation-stack";
import defaultNavOptions from "./default-nav-options";
import { SETTING } from "../constants/screen-names";
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
        };
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

export default UserStackNavigator;
