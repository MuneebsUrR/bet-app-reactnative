import { Stack } from "expo-router";
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {

  return (
  <AppProvider>
  <Stack screenOptions={{
    animation: 'fade',
    headerShown: false,
  }} />
  </AppProvider>);
}

 