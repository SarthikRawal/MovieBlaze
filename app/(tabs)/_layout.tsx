import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => {

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full items-center justify-center rounded-full min-h-16 min-w-[112px] mt-2 overflow-hidden"
      >
        <Image
          source={icon}
          tintColor="#151312"
          className="size-5"
        />
        <Text className="text-base font-semibold ml-2 text-secondary">{title}</Text>
      </ImageBackground>
    );
  }
  return (
    <View className="flex flex-row size-full items-center justify-center rounded-full mt-4">
      <Image
        source={icon}
        tintColor="#a8b5db"
        className="size-5"
      />
      <Text className="text-base font-semibold ml-2 text-secondary">{title}</Text>
    </View>
  );
}

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title="Home"
            />
          ),
        }} />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              title="Search"
            />
          ),
        }} />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.save}
              title="Saved"
            />
          ),
        }} />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title="Profile"
            />
          ),
        }} />
    </Tabs>
  );
}