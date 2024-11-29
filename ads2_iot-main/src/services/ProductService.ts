import axios from 'axios';

const API_URL = 'https://api.mockae.com/fakeapi/products/';

const ProductService = {
  fetchProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },
};

export default ProductService;