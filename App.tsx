import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UsersScreen from './src/screens/UsersScreen';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SubcategoriesScreen from './src/screens/SubcategoriaScreen';
import ProductsScreen from './src/screens/ProductsScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="login"
        component={LoginScreen}
        options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen name="home"
        component={HomeScreen}
        options={{title: "Menu Princioal"}}></Stack.Screen>

        <Stack.Screen name="users"
        component={UsersScreen}
        options={{title: "Gestion de Usuarios"}}></Stack.Screen>

        <Stack.Screen name="categories"
        component={CategoriesScreen}
        options={{title: "categorias"}}></Stack.Screen>

        <Stack.Screen name="subcategories"
        component={SubcategoriesScreen}
        options={{title: "subcategorias"}}></Stack.Screen>

        <Stack.Screen name="products"
        component={ProductsScreen} 
        options={{title: "Productos"}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
