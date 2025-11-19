import React,{useState, useEfect} from "react";
import { View, Text, Flatlist, TouchableOpacity, Alert, TextInput, Modal, ActivityIndicator, ScrollView} from "react-native";
import { categoriesSyles} from "../styles/CategoriesSyles";
import { categoryService, authService} from "../services/api";

export default function CategoriesScreen(){
    const [categories, setCategories] = useState<any>[]([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({name : "", description: ""});
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEfect (() => {
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

    const loadCategories = async () => {
        setLoading(true);
        setError("");
        try{
            const response = await categoryService.getAll();
            setCategories(response?.data || []);
        }catch(error){
            setError("No se pudieron cargar las categorias :33");
            setCategories([]);
        } finally{
            setLoading(false);
        }
    };

    const handlesave = async () => {
        if(!formData.name.trim()){
            Alert.alert("Error", "el nombre es obligatorio");
            return;
        }
        
        try{
            if(editing){
                await categoryService.update(editing.id, formData);
                Alert.alert("Exito","categoria actualizada exitosamente");
            }else{
                await categoryService.create(formData);
                Alert.alert("Exito", "categoria creada exitosamente");
                setModalVisible(false);
                resetForm();
                loadCategories();
            }
        }catch(error){
            Alert.alert("Error","No se pudo guardar la categoria");
        }
    };

    const handleDelete = async (item: any) => {
        if(currentUser?.role !== "admin"){
            Alert.alert("Acceso denegado", "Solo los administradores pueden eliminar categorias");
            return;
        }
        Alert.alert("Confiar",`¿eliminar ${item.name}?`,[
            {text: 'Cancelar', style: 'cancel'},
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    try{
                        await categoryService.delete(item.id);
                        Alert.alert("Exito", "categoria eliminada exitosamente");
                        loadCategories();
                    }catch(error){
                        Alert.alert("Error", "No se pudo eliminar la categoria");
                    }
                }
            }
        ])
    }
}
