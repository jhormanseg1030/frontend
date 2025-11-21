import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { authService, statsService } from '../services/api';
import { homeStyles } from '../styles/HomeStyles';
import { Colors } from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    loadStats();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await statsService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
      Alert.alert('Error', 'No se pudieron cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Está seguro que desea cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          onPress: async () => {
            await authService.logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={homeStyles.container} contentContainerStyle={homeStyles.scrollContainer}>
      <View style={homeStyles.header}>
        <View style={homeStyles.welcomeContainer}>
          <Text style={homeStyles.welcomeText}>¡Bienvenido de vuelta!</Text>
          <Text style={homeStyles.userName}>{user?.username || 'Usuario'}</Text>
          <View style={homeStyles.userRole}>
            <Text style={homeStyles.userRoleText}>
              {user?.role === 'ADMIN' ? '👑 Administrador' : '👤 Coordinador'}
            </Text>
          </View>
        </View>
      </View>

      {/* Sección de Estadísticas */}
      <View style={homeStyles.statsContainer}>
        <View style={homeStyles.statsHeader}>
          <Text style={homeStyles.statsIcon}>📊</Text>
          <Text style={homeStyles.statsTitle}>Panel de Control</Text>
        </View>
        
        {loading ? (
          <View style={homeStyles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={homeStyles.loadingText}>Cargando estadísticas...</Text>
          </View>
        ) : stats ? (
          <View style={homeStyles.statsGrid}>
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>{stats.users || 0}</Text>
              <Text style={homeStyles.statLabel}>👥 Usuarios</Text>
            </View>
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>{stats.categories || 0}</Text>
              <Text style={homeStyles.statLabel}>📁 Categorías</Text>
            </View>
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>{stats.subcategories || 0}</Text>
              <Text style={homeStyles.statLabel}>📂 Subcategorías</Text>
            </View>
            <View style={homeStyles.statCard}>
              <Text style={homeStyles.statNumber}>{stats.products || 0}</Text>
              <Text style={homeStyles.statLabel}>🛍️ Productos</Text>
            </View>
          </View>
        ) : (
          <View style={homeStyles.errorContainer}>
            <Text style={homeStyles.errorText}>❌ Error al cargar estadísticas</Text>
          </View>
        )}
      </View>

      {/* Menú de navegación */}
      <View style={homeStyles.menuContainer}>
        <Text style={homeStyles.menuTitle}>🎯 Gestión del Sistema</Text>
        
        <View style={homeStyles.menuGrid}>
          <TouchableOpacity
            style={homeStyles.menuButton}
            onPress={() => navigation.navigate('Users')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.menuIcon}>👥</Text>
            <Text style={homeStyles.menuButtonText}>Usuarios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.menuButton}
            onPress={() => navigation.navigate('Categories')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.menuIcon}>📁</Text>
            <Text style={homeStyles.menuButtonText}>Categorías</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.menuButton}
            onPress={() => navigation.navigate('Subcategories')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.menuIcon}>📂</Text>
            <Text style={homeStyles.menuButtonText}>Subcategorías</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.menuButton}
            onPress={() => navigation.navigate('Products')}
            activeOpacity={0.7}
          >
            <Text style={homeStyles.menuIcon}>🛍️</Text>
            <Text style={homeStyles.menuButtonText}>Productos</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.logoutButtonContainer}>
          <TouchableOpacity
            style={homeStyles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={homeStyles.logoutIcon}>🚪</Text>
            <Text style={homeStyles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
