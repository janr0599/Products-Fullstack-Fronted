import { Product } from "../types";

type ProductFormProps = {
    selectedProduct?: Product;
};

function ProductForm({ selectedProduct }: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                    Product Name:
                </label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product name"
                    name="name"
                    defaultValue={selectedProduct?.name}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="price">
                    Price:
                </label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product price. eg. 200, 300"
                    name="price"
                    defaultValue={selectedProduct?.price}
                />
            </div>
        </>
    );
}

export default ProductForm;
