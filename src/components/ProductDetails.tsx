import {
    useNavigate,
    Form,
    ActionFunctionArgs,
    redirect,
    useFetcher,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
    product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
    const { id } = params;
    if (id !== undefined) {
        const response = await deleteProduct(+id);
        console.log(response);
        return redirect("/");
    }
};

function ProductDetails({ product }: ProductDetailsProps) {
    const navigate = useNavigate();
    const fetcher = useFetcher();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800 text-center">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${
                            product.availability ? "text-black" : "text-red-600"
                        } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:bg-slate-100`}
                    >
                        {product.availability ? "Available" : "Out of Stock"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`products/${product.id}/edit`)}
                        className="bg-indigo-600 w-full p-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors rounded-lg text-center"
                    >
                        Edit
                    </button>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (
                                !confirm("Do you want to delete this product?")
                            ) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Delete"
                            className="bg-red-600 p-2 w-full text-xs font-bold text-white hover:bg-red-500 transition-colors rounded-lg text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}

export default ProductDetails;
