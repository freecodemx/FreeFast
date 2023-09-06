import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import {
    createSectionRequest,
    getSectionsRequest,
    deleteSectionRequest,
    getSectionRequest,
    updateSectionRequest,
    getAllSectionsRequest,
} from "../api/sections.js";

const SectionContext = createContext();


export const useSection = () => {
    try {
        const context = useContext(SectionContext);
        console.log(context)
        if (!context) 
            throw new Error("useSection debe ser usado dentro de un SectiontProvider");
            return context; 
    } catch (error) {
        console.log(error)
      
    }

};


export function SectionProvider({ children }) {
    const [sections, setSections] = useState([]);

    const createSection = async (section) => {
        try {
            const res = await createSectionRequest(section);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSections = async () => {
        try {
            const res = await getSectionsRequest();
            setSections(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllSections = async () => {
        try {
            const res = await getAllSectionsRequest();
            setSections(res.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

/*     useEffect(() => {
        getAllProducts()
    }, []);
 */
    const deleteSection = async (id) => {
        try {
            const res = await deleteSectionRequest(id);
            if (res.status === 204) setSections(sections.filter((section) => section._id !== id));
        } catch (error) {
            console.log(error);
        }
    };


    const getSection = async (id) => {
        try {
            const res = await getSectionRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateSection = async (id, section) => {
        try {
            await updateSectionRequest(id, section);
        } catch (error) {
            console.error(error);
        }
    };

    const getSectionById = (id) => {
        return sections.find((section) => section._id === id);
    };


    return (
        <SectionContext.Provider
            value={{
                sections,
                getSections,
                getAllSections,
                createSection,
                deleteSection,
                getSection,
                updateSection,
                getSectionById
            }}
        >
            {children}
        </SectionContext.Provider>
    );
}

SectionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
