import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { EditOrDeleteProduct } from "./EditOrDeleteProduct";
import { useAdminStore } from "@/store/useAdminStore";

const SeeProducts = () => {
  const { getAllProducts, products } = useProductStore();
  const { setProductForEditOrDelete } = useAdminStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  const [menu, setMenu] = useState<string>("see-products");
  const handleEditOrDelete = (productId: string) => {
    setProductForEditOrDelete(productId);
    setMenu("EditOrDeleteProduct");
  };
  return (
    <>
      {menu === "see-products" && (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-6">See Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg shadow hover:shadow-lg transition-shadow p-4 space-y-3 group w-full max-w-sm h-[450px] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-md bg-gray-100 flex items-center justify-center h-40 flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width={256}
                    height={256}
                    className="object-contain h-full w-full"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1 flex-grow overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: {product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock} | Status: {product.status}
                  </p>
                </div>

                {/* Footer: price and button */}
                <div className="flex items-center justify-between pt-2 flex-shrink-0">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleEditOrDelete(product._id!)}
                    className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm transition-all"
                  >
                    <span>Edit or delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {menu === "EditOrDeleteProduct" && <EditOrDeleteProduct setMenu={setMenu} />}
    </>
  );
};

export default SeeProducts;
