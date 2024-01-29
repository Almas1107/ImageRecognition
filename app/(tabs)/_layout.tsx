import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="two" />
    </Tabs>
  );
}
