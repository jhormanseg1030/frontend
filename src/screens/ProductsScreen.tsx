import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { productsStyles } from '../styles/ProductsStyles';
import { productService, categoryService, subcategoryService, authService } from '../services/api';

export default function ProductsScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    subcategoryId: '',
    active: true
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSubcategories();
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const filtered = (subcategories || []).filter(
        (sub) => sub?.category?.id?.toString() === formData.categoryId
      );
      setFilteredSubcategories(filtered || []);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.categoryId, subcategories]);

  const loadCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response?.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      Alert.alert('Error', 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response?.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  const loadSubcategories = async () => {
    try {
      const response = await subcategoryService.getAll();
      setSubcategories(response?.data || []);
    } catch (error) {
      console.error('Error loading subcategories:', error);
      setSubcategories([]);
    }
  };

  const handleSave = async () => {
    if (!formData.categoryId || !formData.subcategoryId) {
      Alert.alert('Error', 'Debe seleccionar categoría y subcategoría');
      return;
    }

    try {
      const data = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        active: formData.active,
        category: { id: parseInt(formData.categoryId) },
        subcategory: { id: parseInt(formData.subcategoryId) }
      };

      if (editing) {
        await productService.update(editing.id, data);
        Alert.alert('Éxito', 'Producto actualizado');
      } else {
        await productService.create(data);
        Alert.alert('Éxito', 'Producto creado');
      }
      setModalVisible(false);
      resetForm();
      loadProducts();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = (item: any) => {
    if (currentUser?.role !== 'ADMIN') {
      Alert.alert('Acceso Denegado', 'Solo los administradores pueden eliminar');
      return;
    }

    Alert.alert('Confirmar', `¿Eliminar producto ${item.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await productService.delete(item.id);
            Alert.alert('Éxito', 'Producto eliminado');
            loadProducts();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  const openModal = (item: any = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price?.toString() || '',
        stock: item.stock?.toString() || '',
        categoryId: item.category?.id?.toString() || '',
        subcategoryId: item.subcategory?.id?.toString() || '',
        active: item.active
      });
    } else {
      resetForm();
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: '',
      subcategoryId: '',
      active: true
    });
  };

  return (
    <View style={productsStyles.container}>
      {/* Header */}
      <View style={productsStyles.header}>
        <Text style={productsStyles.headerTitle}>Gestión de Productos</Text>
        <Text style={productsStyles.headerSubtitle}>
          Administra el inventario de productos
        </Text>
      </View>

      {/* Actions */}
      <View style={productsStyles.actionsContainer}>
        <TouchableOpacity
          style={productsStyles.primaryButton}
          onPress={() => openModal()}
        >
          <Text style={productsStyles.primaryButtonText}>+ Nuevo Producto</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products || []}
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        refreshing={loading}
        onRefresh={loadProducts}
        renderItem={({ item }) => {
          if (!item) return null;
          
          return (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item?.name || 'Sin nombre'}</Text>
                <Text style={styles.cardSubtitle}>{item?.description || 'Sin descripción'}</Text>
                <Text style={styles.cardPrice}>Precio: ${item?.price || '0'}</Text>
                <Text style={styles.cardStock}>Stock: {item?.stock || '0'}</Text>
                <Text style={styles.cardCategory}>
                  {item?.category?.name || 'Sin categoría'} / {item?.subcategory?.name || 'Sin subcategoría'}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Text style={styles.editButton}>✏️</Text>
                </TouchableOpacity>
                {currentUser?.role === 'ADMIN' && (
                  <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Text style={styles.deleteButton}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editing ? 'Editar Producto' : 'Nuevo Producto'}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={2}
            />

            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="decimal-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={formData.stock}
              onChangeText={(text) => setFormData({ ...formData, stock: text })}
              keyboardType="number-pad"
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Categoría:</Text>
              <Picker
                selectedValue={formData.categoryId}
                onValueChange={(value: string) => setFormData({ ...formData, categoryId: value, subcategoryId: '' })}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione categoría" value="" />
                {(categories || []).map((cat) => {
                  if (!cat || !cat.id || !cat.name) return null;
                  return (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id.toString()} />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Subcategoría:</Text>
              <Picker
                selectedValue={formData.subcategoryId}
                onValueChange={(value: string) => setFormData({ ...formData, subcategoryId: value })}
                style={styles.picker}
                enabled={(filteredSubcategories || []).length > 0}
              >
                <Picker.Item label="Seleccione subcategoría" value="" />
                {(filteredSubcategories || []).map((sub) => {
                  if (!sub || !sub.id || !sub.name) return null;
                  return (
                    <Picker.Item key={sub.id} label={sub.name} value={sub.id.toString()} />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
