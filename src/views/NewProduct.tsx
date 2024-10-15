import {
    Link,
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export const action = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes("")) {
        error = "All fields are required";
    }
    if (error.length) {
        return error;
    }

    await addProduct(data);

    return redirect("/");
};

function NewProduct() {
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    New Product
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Add Product"
                />
            </Form>
        </>
    );
}

export default NewProduct;
