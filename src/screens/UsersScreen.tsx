import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  TextInput, 
  Modal, 
  ActivityIndicator,
  Switch,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { userService, authService } from '../services/api';
import { usersStyles } from '../styles/UsersStyles';
import { Colors } from '../styles/GlobalStyles';

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'COORDINADOR',
    active: true,
  });

  useEffect(() => {
    loadUsers();
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (error) {
      setError('No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      role: 'COORDINADOR',
      active: true,
    });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (user: any) => {
    setFormData({
      username: user.username,
      password: '',
      email: user.email,
      role: user.role,
      active: user.active,
    });
    setEditingUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const handleSave = async () => {
    if (!formData.username || !formData.email) {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }

    if (!editingUser && !formData.password) {
      Alert.alert('Error', 'La contraseña es requerida para nuevos usuarios');
      return;
    }

    try {
      if (editingUser) {
        const updateData: any = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await userService.update(editingUser.id, updateData);
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
      } else {
        await userService.create(formData);
        Alert.alert('Éxito', 'Usuario creado correctamente');
      }
      closeModal();
      loadUsers();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Error al guardar usuario');
    }
  };

  const handleDelete = (userId: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro que desea eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await userService.delete(userId);
              Alert.alert('Éxito', 'Usuario eliminado correctamente');
              loadUsers();
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.message || 'Error al eliminar usuario');
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={usersStyles.container}>
        <View style={usersStyles.header}>
          <View style={usersStyles.headerContent}>
            <Text style={usersStyles.headerTitle}>👥 Usuarios</Text>
          </View>
        </View>
        <View style={usersStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={usersStyles.loadingText}>Cargando usuarios...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={usersStyles.container}>
        <View style={usersStyles.header}>
          <View style={usersStyles.headerContent}>
            <Text style={usersStyles.headerTitle}>👥 Usuarios</Text>
          </View>
        </View>
        <View style={usersStyles.errorContainer}>
          <Text style={usersStyles.errorIcon}>⚠️</Text>
          <Text style={usersStyles.errorText}>{error}</Text>
          <TouchableOpacity style={usersStyles.retryButton} onPress={loadUsers}>
            <Text style={usersStyles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={usersStyles.container}>
      <View style={usersStyles.header}>
        <View style={usersStyles.headerContent}>
          <Text style={usersStyles.headerTitle}>👥 Usuarios</Text>
          
          {currentUser?.role === 'ADMIN' && (
            <TouchableOpacity
              style={usersStyles.addButton}
              onPress={openCreateModal}
              activeOpacity={0.7}
            >
              <Text style={usersStyles.addButtonIcon}>➕</Text>
              <Text style={usersStyles.addButtonText}>Nuevo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {users.length === 0 ? (
        <View style={usersStyles.emptyContainer}>
          <Text style={usersStyles.emptyIcon}>👥</Text>
          <Text style={usersStyles.emptyText}>No hay usuarios registrados</Text>
          <Text style={usersStyles.emptySubtext}>
            {currentUser?.role === 'ADMIN' 
              ? 'Presiona el botón "Nuevo" para agregar el primer usuario'
              : 'No tienes permisos para crear usuarios'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={usersStyles.userCard}>
              <View style={usersStyles.userCardHeader}>
                <View style={usersStyles.userInfo}>
                  <Text style={usersStyles.userName}>👤 {item.username}</Text>
                  <Text style={usersStyles.userEmail}>📧 {item.email}</Text>
                  
                  <View style={usersStyles.userMeta}>
                    <View style={[
                      usersStyles.roleBadge,
                      item.role === 'ADMIN' && usersStyles.roleBadgeAdmin
                    ]}>
                      <Text style={usersStyles.roleBadgeText}>
                        {item.role === 'ADMIN' ? '👑 Admin' : '👤 Coordinador'}
                      </Text>
                    </View>
                    
                    <View style={[
                      usersStyles.statusBadge,
                      item.active ? usersStyles.statusBadgeActive : usersStyles.statusBadgeInactive
                    ]}>
                      <Text style={usersStyles.statusBadgeText}>
                        {item.active ? '✅ Activo' : '❌ Inactivo'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {currentUser?.role === 'ADMIN' && (
                <View style={usersStyles.actionsContainer}>
                  <TouchableOpacity
                    style={[usersStyles.actionButton, usersStyles.editButton]}
                    onPress={() => openEditModal(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={usersStyles.actionButtonIcon}>✏️</Text>
                    <Text style={usersStyles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[usersStyles.actionButton, usersStyles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={usersStyles.actionButtonIcon}>🗑️</Text>
                    <Text style={usersStyles.actionButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={usersStyles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={usersStyles.modalOverlay}>
          <View style={usersStyles.modalContent}>
            <View style={usersStyles.modalHeader}>
              <Text style={usersStyles.modalTitle}>
                {editingUser ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}
              </Text>
              <TouchableOpacity style={usersStyles.closeButton} onPress={closeModal}>
                <Text style={usersStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={usersStyles.formContainer}>
              <View style={usersStyles.inputGroup}>
                <Text style={usersStyles.inputLabel}>👤 Usuario *</Text>
                <TextInput
                  style={[
                    usersStyles.input,
                    focusedInput === 'username' && usersStyles.inputFocused
                  ]}
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChangeText={(text) => setFormData({...formData, username: text})}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  autoCapitalize="none"
                />
              </View>

              <View style={usersStyles.inputGroup}>
                <Text style={usersStyles.inputLabel}>📧 Email *</Text>
                <TextInput
                  style={[
                    usersStyles.input,
                    focusedInput === 'email' && usersStyles.inputFocused
                  ]}
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={usersStyles.inputGroup}>
                <Text style={usersStyles.inputLabel}>
                  🔒 Contraseña {!editingUser && '*'}
                </Text>
                <TextInput
                  style={[
                    usersStyles.input,
                    focusedInput === 'password' && usersStyles.inputFocused
                  ]}
                  placeholder={editingUser ? "Dejar vacío para mantener actual" : "Contraseña"}
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry
                />
              </View>

              <View style={usersStyles.inputGroup}>
                <Text style={usersStyles.inputLabel}>👑 Rol</Text>
                <View style={usersStyles.pickerContainer}>
                  <Picker
                    selectedValue={formData.role}
                    onValueChange={(value) => setFormData({...formData, role: value})}
                    style={usersStyles.picker}
                  >
                    <Picker.Item label="👤 Coordinador" value="COORDINADOR" />
                    <Picker.Item label="👑 Administrador" value="ADMIN" />
                  </Picker>
                </View>
              </View>

              <View style={usersStyles.inputGroup}>
                <View style={usersStyles.switchContainer}>
                  <Text style={usersStyles.switchLabel}>✅ Usuario activo</Text>
                  <Switch
                    value={formData.active}
                    onValueChange={(value) => setFormData({...formData, active: value})}
                    trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                    thumbColor={Colors.white}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={usersStyles.modalButtons}>
              <TouchableOpacity
                style={[usersStyles.modalButton, usersStyles.cancelButton]}
                onPress={closeModal}
                activeOpacity={0.7}
              >
                <Text style={[usersStyles.modalButtonText, usersStyles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[usersStyles.modalButton, usersStyles.saveButton]}
                onPress={handleSave}
                activeOpacity={0.7}
              >
                <Text style={[usersStyles.modalButtonText, usersStyles.saveButtonText]}>
                  {editingUser ? 'Actualizar' : 'Crear'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
