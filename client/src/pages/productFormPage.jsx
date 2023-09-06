import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useProduct } from "../context/ProductContext.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";

function ProductFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { createProduct, getProduct, updateProduct } = useProduct();
  const { errors: productFormErrors } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product);
        // Resto del código para setValue...
        setValue('nombre', product.nombre)
        setValue('precio', product.precio)
        setValue('categoria', product.categoria)
        setValue('disponible', product.disponible)
        setValue('fabricante', product.fabricante)
        setValue('numero_existencias', product.numero_existencias)
        setValue('estatus', product.estatus)
        setValue('section', product.section)
      } 
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate("/products");
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full border max-w-md p-6 rounded-md shadow-md">
        <h1 className="text-2xl text-center font-bold mb-4">¡Registra tu Producto!</h1>
        {productFormErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
        <input type="text" {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del Producto"
          />
          {
            errors.nombre && (
              <p className="text-red-500"> ¡El campo Nombre del producto es requerido!</p>
            )
          }
          <input type="text" {...register("precio", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="¡Precio Estimado!"
          />
          {
            errors.precio && (
              <p className="text-red-500 my-2">¡El campo Precio es requerido!</p>
            )
          }
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
                    <select {...register("section", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
            <option value="">Sección</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Línea Blanca">Línea Blanca</option>
            <option value="Perfumería">Perfumería</option>
            <option value="Hogar">Hogar</option>
            <option value="Ropa">Ropa</option>
            <option value="Comida">Comida</option>
          </select>
          {
            errors.section && (
              <p className="text-red-500">¡La sección del producto es requerida!</p>
            )
          }
          <input type="text" {...register("fabricante", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Fabricante del Producto"
          />
          {
            errors.fabricante && (
              <p className="text-red-500"> ¡El campo Fabricante del producto es requerido!</p>
            )
          }
          <input
            type="checkbox"
            {...register("disponible", { required: true })}
            className="mr-2"
            id="disponible-checkbox"
          />
          <label htmlFor="disponible-checkbox">Disponible</label>
          {errors.disponible && (
            <p className="text-red-500">¡Debes seleccionar si el producto está disponible!</p>
          )}
          <input type="text" {...register("numero_existencias", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="¡Número de Existencias"
          />
          {
            errors.numero_existencias && (
              <p className="text-red-500 my-2">¡El campo Número de Existencias es requerido!</p>
            )
          }
          <select {...register("estatus", { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
            <option value="">Elige Estatus</option>
            <option value="Abierto">Abierto</option>
            <option value="Solicitud">Solicitud</option>
            <option value="Entregado">Entregado</option>
          </select>
          {
            errors.estatus && (
              <p className="text-red-500">¡El estatus del producto es requerid!</p>
            )
          }
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
