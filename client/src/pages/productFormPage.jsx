import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useProduct } from "../context/ProductContext.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useSection } from "../context/SectionContext"; //

function ProductFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { getSections, sections } = useSection();
  //VARIABLES DEL CONTEXTO-> ProductContext.jsx
  const { createProduct, getProduct, updateProduct } = useProduct();
  const { errors: productFormErrors } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(createProduct);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product)
        setValue('nombre', product.nombre)
        setValue('precio', product.precio)
        setValue('categoria', product.categoria)
        setValue('disponible', product.disponible)
        setValue('estatus', product.estatus)
        setValue('fabricante', product.fabricante)
        setValue('section', product.section)
        setValue('numero_existencias', product.numero_existencias)

      }
    }
    loadProduct()
    getSections();
  }, []);
  //
  const onSubmit = handleSubmit(async (data) => {
    const { nombre, descripcion, precio, categoria, disponible, fabricante, numero_existencias, estatus, imageURL, section } = data;
    const productData = {
      nombre,
      descripcion,
      precio,
      categoria,
      disponible,
      fabricante,
      numero_existencias,
      estatus,
      imageURL,
      section: section,
    
    };



    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(productData);
    }
    navigate("/products")
  });
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-zinc-800 w-full md:max-w-md p-6 md:p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">¡Registra tu Producto!</h1>
        {productFormErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Nombre del Producto"
          />
          {errors.nombre && (
            <p className="text-red-500">¡El campo Nombre del producto es requerido!</p>
          )}
          <input
            type="text"
            {...register("precio", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="¡Precio Estimado!"
          />
          {errors.precio && (
            <p className="text-red-500">¡El campo Precio es requerido!</p>
          )}
          <select {...register("categoria", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
            <option value="">Elige Categoría</option>
            <option value="Gratis">Gratis</option>
            <option value="Baja">Baja</option>
            <option value="Media Baja">Media Baja</option>
            <option value="Media">Media</option>
            <option value="Media Alta">Media Alta</option>
            <option value="Alta">Alta</option>
          </select>
          {
            errors.categoria && (
              <p className="text-red-500">¡La categoría del producto es requerida!</p>
            )
          }
          <select
            {...register("section", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          >
            <option value="">Sección</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.nombre}
              </option>
            ))}
          </select>
          {errors.section && (
            <p className="text-red-500">¡La sección del producto es requerida!</p>
          )}
          <input
            type="text"
            {...register("fabricante", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Fabricante del Producto"
          />
          {errors.fabricante && (
            <p className="text-red-500"> ¡El campo Fabricante del producto es requerido!</p>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("disponible", { required: true })}
              id="disponible-checkbox"
            />
            <label htmlFor="disponible-checkbox" className="text-white">Disponible</label>
          </div>
          {errors.disponible && (
            <p className="text-red-500">¡Debes seleccionar si el producto está disponible!</p>
          )}
          <input
            type="text"
            {...register("numero_existencias", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="¡Número de Existencias"
          />
          {errors.numero_existencias && (
            <p className="text-red-500">¡El campo Número de Existencias es requerido!</p>
          )}
          <select
            {...register("estatus", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          >
            <option value="">Elige Estatus</option>
            <option value="Abierto">Abierto</option>
            <option value="Solicitud">Solicitud</option>
            <option value="Entregado">Entregado</option>
          </select>
          {errors.estatus && (
            <p className="text-red-500">¡El estatus del producto es requerido!</p>
          )}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-200">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );

}


export default ProductFormPage;