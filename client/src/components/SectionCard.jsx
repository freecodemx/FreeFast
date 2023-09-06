import PropTypes from "prop-types";
//import { useSection } from "../context/SectionContext";
import { Link } from "react-router-dom";

function SectionCard({ section }) {
    //const { deleteSection } = useSection();
    console.log(section);
    return (
        <div className=" hover:bg-blue-900 border border-gray-300 p-4 rounded-lg shadow-md text-white">
            <p className="text-white mb-2">
                <span className="font-bold">Nombre:</span> {section.nombre}
            </p>
            <p className="text-white mb-2">
                <span className="font-bold">Existencias:</span>{" "}
                {section.descripcion}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-right">
{/*                 <Link
                    onClick={() => {
                        deleteSection(section._id);
                    }}
                    className="bg-red-600 hover:bg-red-600 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Borrar
                </Link> */}
                <Link
                    to={`/products/section/${section._id}`}
                    className="bg-red-600 hover:bg-blue-300 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Ver
                </Link>
{/*                 <Link
                    to={`/products/section/${section._id}`}
                    className="bg-orange-600 hover:bg-blue-300 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
                >
                    Detalles
                </Link> */}
            </div>
        </div>
    );
}

SectionCard.propTypes = {
    section: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        // Agrega más validaciones de propiedades si es necesario
    }).isRequired,
};

export default SectionCard;
