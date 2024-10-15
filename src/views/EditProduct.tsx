import {
    Link,
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { editProduct, getProductById } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (id !== undefined) {
        const selectedProduct = await getProductById(+id);
        if (!selectedProduct) {
            return redirect("/");
        }
        return selectedProduct;
    }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes("")) {
        error = "All fields are required";
    }

    if (error.length) {
        return error;
    }

    const { id } = params;

    if (id !== undefined) {
        await editProduct(data, +id);
        return redirect("/");
    }
};

const availabilityOptions = [
    { name: "Available", value: true },
    { name: "Out of Stock", value: false },
];

function EditProduct() {
    const error = useActionData() as string;
    const selectedProduct = useLoaderData() as Product;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Edit Product
                </h2>
                <Link
                    to="/"
                    className="bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors rounded-lg"
                >
                    Back to products
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form className="mt-10" method="POST">
                <ProductForm selectedProduct={selectedProduct} />

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability">
                        Availability:
                    </label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={selectedProduct?.availability.toString()}
                    >
                        {availabilityOptions.map((option) => (
                            <option
                                key={option.name}
                                value={option.value.toString()}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Edit Product"
                />
            </Form>
        </>
    );
}

export default EditProduct;
