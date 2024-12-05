"use client"
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductDetail {
    "id": number;
    "name": string;
    "description": string;
    "price": number;
    "category": string;
    "stock": number;
    "sku": string;
    "image_url": string;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDetail | null>(null);

    const imageUrl = `https://fakeimg.pl/400x300/`;

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.mockae.com/fakeapi/products/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do produto: ", error)
                throw error;
            }
        };

        getProductDetail();
    }, [id])

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header title="Produto" username="Pablo Sanches" />
                <main>

                    {!product ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="mt-20 p-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center md:flex-row md:items-start">
                                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        width={400}
                                        height={500}
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-8">
                                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <div className="mb-4">
                                        <span className="font-semibold">Categoria:</span> {product.category}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-semibold">Preço:</span> R$ {product.price.toFixed(2)}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-semibold">Estoque:</span> {product.stock}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-semibold">SKU:</span> {product.sku}
                                    </div>
                                    <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Adicionar ao Carrinho
                                    </button>
                                    <Link href={'/products'}>
                                        <button className="min-w-40 ml-4 mt-6 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                            Voltar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductDetails;