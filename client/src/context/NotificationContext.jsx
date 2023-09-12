import PropTypes from "prop-types"; 
import  { createContext, useContext, useReducer } from 'react';

// Definir los tipos de acciones para el reducer
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const MARK_AS_READ = 'MARK_AS_READ';

// Reducer para administrar las notificaciones
const notificationReducer = (state, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, action.payload];
        case MARK_AS_READ:
            return state.map((notification) =>
                notification.id === action.payload ? { ...notification, isRead: true } : notification
            );
        default:
            return state;
    }
};

// Crear el contexto de notificaciones
const NotificationContext = createContext();

// Proveedor de notificaciones
export const NotificationProvider = ({ children }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, []);

    // Función para agregar una nueva notificación
    const addNotification = (message) => {
        const newNotification = {
            id: Date.now(), // Puedes usar un ID más robusto en una aplicación real
            message,
            isRead: false,
        };
        dispatch({ type: ADD_NOTIFICATION, payload: newNotification });
    };

    // Función para marcar una notificación como leída
    const markNotificationAsRead = (notificationId) => {
        dispatch({ type: MARK_AS_READ, payload: notificationId });
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markNotificationAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de notificaciones
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications debe usarse dentro de un NotificationProvider');
    }
    return context;
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};