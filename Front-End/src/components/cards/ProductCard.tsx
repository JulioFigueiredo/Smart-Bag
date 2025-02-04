import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard: React.FC<Product> = ({ id, category, rate, name, price, image }) => {

    const imageUrl = image && image.startsWith('http') ? image : `https://fakeimg.pl/286x150/`; 

    return (
        <div className="border rounded-lg p-4 m-4 w-80 shadow-lg">
            <div className="mb-4 relative" style={{ width: '286px', height: '150px' }}>
                <Image
                    src={imageUrl}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600"><strong>Categoria:</strong> {category}</p>
            <p className="text-sm text-gray-600"><strong>Avaliação:</strong> {rate}</p>
            <p className="text-sm text-gray-600"><strong>Preço:</strong> ${price}</p>
            <Link href={`/products/${id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Comprar
                </button>
            </Link>
        </div>
    );
}

export default ProductCard;
