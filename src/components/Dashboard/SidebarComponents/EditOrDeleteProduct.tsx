import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { toast } from "react-toastify";

export function EditOrDeleteProduct({
  setMenu,
}: {
  setMenu: (menu: string) => void;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const {
    productForEditOrDelete,
    editProduct,
    editProductLoader,
    deleteProductLoader,
    deleteProduct,
  } = useAdminStore();

  useEffect(() => {
    if (productForEditOrDelete) {
      setId(productForEditOrDelete._id!);
      setName(productForEditOrDelete.name);
      setDescription(productForEditOrDelete.description);
      setPrice(productForEditOrDelete.price.toString());
      setCategory(productForEditOrDelete.category);
      setStock(productForEditOrDelete.stock.toString());
      setStatus(productForEditOrDelete.status);
      setImages(productForEditOrDelete.images);
      setImagePreviews(productForEditOrDelete.images);
    }
  }, [productForEditOrDelete]);

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    const newBase64s: string[] = [];
    const newPreviews: string[] = [];
    for (const file of Array.from(files)) {
      const base64 = await convertToBase64(file);
      newBase64s.push(base64);
      newPreviews.push(URL.createObjectURL(file));
    }
    setImages((prev) => [...prev, ...newBase64s]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editProductLoader) {
      return;
    }
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Product name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!stock) newErrors.stock = "Stock is required.";
    if (!status) newErrors.status = "Status is required.";
    if (images.length === 0)
      newErrors.images = "At least one image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      status: status as "active" | "inactive",
      images,
    };

    if (!id) {
      toast.error("Product ID is missing for editing.");
      return;
    }
    editProduct(id, productData).then(() => {
      setMenu("see-products");
    });
  };

  const inputStyle =
    "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full rounded-lg px-3 py-2 transition";

  return (
    <div className="h-full overflow-auto w-full px-5 py-5 flex flex-col items-center">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <X
          onClick={() => setMenu("see-products")}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
        />
        <h1 className="font-bold text-2xl text-gray-800 mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputStyle}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputStyle}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputStyle}
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Men Clothing">Men Clothing</option>
                <option value="Women Clothing">Women Clothing</option>
                <option value="Home and Kitchen">Home and Kitchen</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
                <option value="Beauty and Personal Care">
                  Beauty & Personal Care
                </option>
                <option value="Sports and Outdoors">Sports & Outdoors</option>
                <option value="Shoes and Footwear">Shoes and Footwear</option>
                <option value="Groceries">Groceries</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Stock + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="stock"
                className="block font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={inputStyle}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="status"
                className="block font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputStyle}
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          {/* Product Images */}
          <div>
            <label htmlFor="images" className="block font-medium text-gray-700">
              Product Images
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              className={inputStyle}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-md border border-gray-200"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <button
              disabled={editProductLoader}
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 transition w-full md:w-auto ${
                editProductLoader ? "opacity-70 cursor-not-allowed" : ""
              } `}
            >
              Save Changes
            </button>
            <button
              disabled={deleteProductLoader}
              onClick={() => {
                deleteProduct(id);
                setMenu("see-products");
              }}
              className={`bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-2 transition w-full md:w-auto ${
                deleteProductLoader ? "opacity-70 cursor-not-allowed" : ""
              } `}
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
