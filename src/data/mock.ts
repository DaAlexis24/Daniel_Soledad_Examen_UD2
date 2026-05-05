import type { Product } from '../server.ts';

export const mockProducts: Product[] = [
    {
        id: crypto.randomUUID(),
        name: 'Camiseta GitHub Originals',
        price: 20,
        stock: 10,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: crypto.randomUUID(),
        name: 'Vaquero BluePrint ColdCulture',
        price: 50,
        stock: 8,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: crypto.randomUUID(),
        name: 'Blusa Postman - U GET my URL',
        price: 15,
        stock: 6,
        is_active: false,
        created_at: new Date(),
        updated_at: new Date(),
    },
];
