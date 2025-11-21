import React,{useState, useEffect} from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Modal, ActivityIndicator, ScrollView} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { subcategoriesStyles} from "../styles/SubcategoriesStyles";
import { subcategoryService, authService, categoryService } from "../services/api";

export default function SubcategoriesScreen(){
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({name : "", description: "", categoryId: "", active: true});
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect (() => {
        loadSubcategories();
        loadCurrentUser();
        loadCategories();
    }, []);

    const loadCurrentUser = async () => {
        try{
            const user = await authService.getCurrentUser();
            setCurrentUser(user);
        }catch(error){
            console.error("error al cargar usuario:", error);
        }
    };

    const loadSubcategories = async () => {
        setLoading(true);
        try{
            const response = await subcategoryService.getAll();
            setSubcategories(response?.data || []);
        }catch(error){
            console.error("No se pudieron cargar las subcategorias :33");
            setSubcategories([]);
            Alert.alert("Error","No se pudieron cargar las subcategorias");
        } finally{
            setLoading(false);
        }
    };

        const loadCategories = async () => {
        try{
            const response = await categoryService.getAll();
            setCategories(response?.data || []);
        }catch(error){
            console.error("No se pudieron cargar las categorias :33");
            setCategories([]);
        }
    };

    const handlesave = async () => {
        if(!formData.categoryId){
            Alert.alert("Error", "Debe seccionar una categoria");
            return;
        }
        
        try{
            const data ={
                name: formData.name,
                decription: formData.description,
                active: formData.active,
                category: {id: parseInt(formData.categoryId)}
            };

            if(editing){
                await subcategoryService.update(editing.id, formData);
                Alert.alert("Exito","subcategoria actualizada exitosamente");
            }else{
                await subcategoryService.create(formData);
                Alert.alert("Exito", "subcategoria creada exitosamente");
                setModalVisible(false);
                resetForm();
                loadSubcategories();
            }
        }catch(error: any){
            Alert.alert("Error",error.response?.data?.message || "Error al guarar ");
        }
    };

    const handleDelete = async (item: any) => {
        if(currentUser?.role !== "admin"){
            Alert.alert("Acceso denegado", "Solo los administradores pueden eliminar categorias");
            return;
        }
        Alert.alert("Confirmar",`¿eliminar subcategoria ${item.name}?`,[
            {text: 'Cancelar', style: 'cancel'},
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    try{
                        await subcategoryService.delete(item.id);
                        Alert.alert("Exito", "subcategoria eliminada exitosamente");
                        loadSubcategories();
                    }catch(error){
                        Alert.alert("Error", "No se pudo eliminar");
                    }
                }
            }
        ]);
    };

    const handleToggleActive = (item: any) => {
        const action = item.active ? "Desactivar": "Activar";(
        Alert.alert("Confirmar", `¿${action.charAt(0).toUpperCase()+ action.slice(1)} ${item.name}?`),
        [
            {text: "Cancelar", style: "cancel"},
            {
                text: action.charAt(0).toUpperCase() +action.slice(1),onPress: async () => {
                    try{
                        await subcategoryService.update(item.id,{
                            name: item.name,
                            description: item.description,
                            active: !item.active,
                            category:{id: item.category.id}
                        });
                        Alert.alert("Exito", `Subcategoria ${item.active ? "desactivada": "activada"}`);
                        loadSubcategories();
                    }catch(error){
                        Alert.alert("Error", `No se pudo ${action}`);
                    }
                }
            }
        ]);
    };

    const openModal = (item: any = null) => {
        if(item){
            setEditing(item);
            setFormData({name: item.name, description: item.description || "", categoryId: item.category?.id?.toString() || "",
            active: item.active
            });
        }else{
            resetForm();
        }
            setModalVisible(true);
        };

        

    const resetForm = () => {
        setEditing(null);
        setFormData({name: "", description: "", categoryId: "", active: true});

    };
        if(loading){
        return(
            <View style={subcategoriesStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#007Aff"></ActivityIndicator>
                <Text style={subcategoriesStyles.loadingText}> Cargando Subcategorias...</Text>
            </View>
        );
    }

    return(
        <View style={subcategoriesStyles.container}>
            {/*header*/}
            <View style={subcategoriesStyles.header}>
                    <Text style={subcategoriesStyles.headerTitle}> Gestiones de Categorias</Text>
                    <Text style={subcategoriesStyles.headerSubtitle}> Administrar las Subcategorias de producto</Text>
            </View>
                    {/*Actions*/}
                <View style={subcategoryService.actionsContainer}>

                    <TouchableOpacity style={subcategoriesStyles.primaryButton} onPress={() => {
                        openModal();
                    }}>
                        <Text style={subcategoriesStyles.primaryButtonText}> Nueva Subcategoria</Text>
                    </TouchableOpacity>
                </View>
                    {/*subcategorias list */}
            <FlatList data={categories}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                refreshing={loading}
                onRefresh={loadSubcategories}
                style={subcategoriesStyles.list}
                contentContainerStyle={subcategoriesStyles.listContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>{
                    if(!item) return null;
                    return(
                        <View style={subcategoriesStyles.card}>
                            <View style={subcategoriesStyles.cardHeader}>
                                    <Text style={subcategoriesStyles.cardTitle}>{item.name || "Sin nombre"} {!item.active && <Text style={{color: "#999"}}>(inactiva)</Text>}
                                    </Text>
                                    <Text style={subcategoriesStyles.cardDescription}>{item.description || "Sin descripcion"}</Text>
                                    <Text style={subcategoriesStyles.cardMeta}> Categoria{item?.category?.name || "Sin categoria"}</Text>
                            </View>
                            <View style={subcategoriesStyles.cardActions}>
                                <TouchableOpacity style={[subcategoriesStyles.actionButton, subcategoriesStyles.editButton]}onPress={() => openModal(item)}>
                                    <Text style={subcategoriesStyles.actionButtonTetx}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                                style={[subcategoriesStyles.activeButton, item.active ? subcategoriesStyles.deleteButton : subcategoriesStyles.
                                                    editingButton
                                                ]} onPress={() => handleToggleActive(item)}>
                                                    <Text style={[subcategoriesStyles.actionButtonText, item.active ? subcategoriesStyles.deleteButtonText :
                                                        subcategoriesStyles.editingButtonText
                                                    ]}>
                                                        {item.active ? "Desactivar" : "Activar"}
                                                    </Text>
                                                </TouchableOpacity>
                                                {currentUser?.role === "admin" && (
                                                    <TouchableOpacity style={[subcategoriesStyles.actionButton,subcategoriesStyles.deleteButton]}
                                                    onPress={() => handleDelete(item)}
                                                    >
                                                        <Text style={[subcategoriesStyles.actionButtonText, subcategoriesStyles.deleteButtonText]}>
                                                            Eliminar
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>  
                                        </View>
                                    );
                                    }}
                ListEmptyComponent={!loading ?(
                    <View style={subcategoriesStyles.emptyContainer}>
                        <Text style={subcategoriesStyles.emptyText}> No hay Subcategorias</Text>
                        <Text style={subcategoriesStyles.emptySubText}> Toca "Nueva" para nueva subcategoria</Text>
                    </View>
                ): null}>
            </FlatList>
                {/*modal*/}

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={subcategoriesStyles.modalOverlay}>
                    <View style={subcategoriesStyles.modalContext}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={subcategoriesStyles.modalHeader}>
                                <Text style={subcategoriesStyles.modalTitle}>{editing ? "editar Subcategoria": "nueva Subcategoria"}</Text>
                            </View>

                            <View style={subcategoriesStyles.formContainer}>
                                <View style={subcategoriesStyles.inputGroup}>
                                    <Text style={subcategoriesStyles.inputLabel}>Nombre *</Text>
                                    <TextInput style={subcategoriesStyles.input} value={formData.name}
                                    onChangeText={(text) => setFormData({...formData, name: text})}
                                    placeholder="nombre de la Subcategoria"
                                    placeholderTextColor="#999" >
                                    </TextInput>
                                </View>
                                <View style={subcategoriesStyles.inputGroup}>
                                    <Text style={subcategoriesStyles.inputLabel}>Descripción</Text>
                                    <TextInput style={[subcategoriesStyles.input, subcategoriesStyles.textArea]}
                                    value={formData.description}
                                    onChangeText={(text) => setFormData({...formData,description: text})}
                                    placeholder="Descripcion"
                                    placeholderTextColor="#999"
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"></TextInput>
                                </View>
                                <View style={subcategoriesStyles.inputGroup}>
                                    <Text style={subcategoriesStyles.inputLabel}>Categoria</Text>
                                    <View style={subcategoriesStyles.picker}>
                                        <Picker selectedValue={formData.categoryId}
                                        onValueChange={(value: string) => setFormData({...formData,categoryId: value})}>

                                            <Picker.Item label="Seleccionar" value=""/>
                                            {(categories || []).map((cat) => {
                                                if(!cat || !cat.id || !cat.name) 
                                                return null;
                                                return(
                                                <Picker.Item key={cat.id} label={cat.name} value={cat.id.toString()}/>
                                                );
                                            })}
                                        </Picker>

                                    </View>
                                    <TextInput style={[subcategoriesStyles.input, subcategoriesStyles.textArea]}
                                    value={formData.description}
                                    onChangeText={(text) => setFormData({...formData,description: text})}
                                    placeholder="Descripcion"
                                    placeholderTextColor="#999"
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"></TextInput>
                                </View>
                            </View>

                            <View style={subcategoriesStyles.modalActions}>
                                <TouchableOpacity style={[subcategoriesStyles.secundaryButton]}
                                onPress={()=> setModalVisible(false)}>
                                    <Text style={[subcategoriesStyles.secundaryButton]}>Cancelar</Text>
                                </TouchableOpacity>                                        
                                <TouchableOpacity style={[subcategoriesStyles.primaryButton]}
                                        onPress={handlesave}>
                                            <Text style={[subcategoriesStyles.primaryButton]}>
                                                {editing ? "Actualizar": "Crear"}
                                            </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
        
    );
}
