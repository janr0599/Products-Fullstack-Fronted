import { z } from "zod";
import { ProductSchema, ProductsSchema } from "../schemas";

export type ProductData = {
    [k: string]: FormDataEntryValue;
};

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;
