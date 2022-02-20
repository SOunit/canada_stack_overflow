import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../common/CustomHeaderButton";

const MenuButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item
      title="Menu"
      iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

export default MenuButton;
