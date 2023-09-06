import { useEffect, useState } from "react";
import { useSection } from "../context/SectionContext"; // Importa el contexto de las secciones
import SectionCard from "../components/SectionCard";

function SectionsPage() {
    const { getSections, sections } = useSection(); // Utiliza el contexto de las secciones
    const [filterName, setFilterName] = useState("");

    useEffect(() => {
        getSections(); // Llama a la función para obtener las secciones cuando se monta la página
    }, []);

    const filteredSections = sections.filter((section) => {
        return (
            filterName === "" ||
            section.nombre.toLowerCase().includes(filterName.toLowerCase())
        );
    });

    if (filteredSections.length === 0) return <h1>Sin secciones</h1>;

    return (
        <div>
            <div className="flex items-center gap-4 border p-4 rounded-lg mb-4">
                <label htmlFor="filterName" className="block text-white mr-2">
                    Filtrar por Nombre:
                </label>
                <input
                    type="text"
                    id="filterName"
                    className="rounded-lg p-1"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSections.map((section) => (
                    <div key={section._id} className="col-span-1">
                        <SectionCard section={section} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionsPage;
