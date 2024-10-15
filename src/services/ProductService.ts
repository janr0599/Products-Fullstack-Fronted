import { Product, ProductData } from "../types";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";
import { z } from "zod";
import { toBoolean } from "../utils";

export const addProduct = async (data: ProductData) => {
    try {
        const result = DraftProductSchema.safeParse({
            name: data.name,
            price: +data.price,
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.data.name,
                price: result.data.price,
            });
            console.log(data);
        } else {
            throw new Error("Invalid data");
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);

        const result = ProductsSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error("There was an error");
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (id: Product["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);

        const result = ProductSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error("There was an error");
        }
    } catch (error) {
        console.log(error);
    }
};

export const editProduct = async (data: ProductData, id: Product["id"]) => {
    try {
        const PriceSchema = z.coerce.number();

        const result = ProductSchema.safeParse({
            id,
            name: data.name,
            price: PriceSchema.parse(data.price),
            availability: toBoolean(data.availability.toString()),
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            const { data } = await axios.put(url, {
                name: result.data.name,
                price: result.data.price,
                availability: result.data.availability,
            });
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id: Product["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.delete(url);

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updateProductavailability = async (id: Product["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.patch(url);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
