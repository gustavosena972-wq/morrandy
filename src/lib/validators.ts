import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const productSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  description: z.string().max(5000).optional(),
  price: z.string().min(1),
  comparePrice: z.string().optional(),
  material: z.string().max(200).optional(),
  sku: z.string().max(80).optional(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().optional(),
  images: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  active: z.coerce.boolean().optional(),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(3).max(120),
  customerEmail: z.email(),
  customerPhone: z.string().min(10).max(20),
  customerCpf: z.string().min(11).max(14).optional(),
  shippingStreet: z.string().min(3).max(200),
  shippingNumber: z.string().min(1).max(20),
  shippingDistrict: z.string().min(2).max(100),
  shippingCity: z.string().min(2).max(100),
  shippingState: z.string().length(2),
  shippingZip: z.string().min(8).max(9),
  shippingComplement: z.string().max(100).optional(),
  paymentMethod: z.enum(["pix", "card"]),
  notes: z.string().max(500).optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        name: z.string(),
        priceCents: z.number().int().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});
