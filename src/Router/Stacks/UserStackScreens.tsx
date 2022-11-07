import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../../Screens/InfoUserStack/UserScreen";

const AccountStack = createNativeStackNavigator();

export default function AccountStackScreens() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="User" component={UserScreen} />
    </AccountStack.Navigator>
  );
}
