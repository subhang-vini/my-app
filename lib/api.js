const API_BASE_URL = 'https://dummyjson.com';

// Cache configuration - 1 minute TTL
const CACHE_TTL = 60; // 60 seconds

/**
 * Fetch all products from the API
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { 
        revalidate: CACHE_TTL,
        tags: ['products']
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

/**
 * Fetch a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise<Object|null>}
 */
export async function getProduct(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { 
        revalidate: CACHE_TTL,
        tags: ['products', `product-${id}`]
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch products by category
 * @param {string} category - Product category
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export async function getProductsByCategory(category) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/category/${category}`, {
      next: { 
        revalidate: CACHE_TTL,
        tags: ['products', `category-${category}`]
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products by category');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export async function searchProducts(query) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
      next: { 
        revalidate: CACHE_TTL,
        tags: ['products', `search-${query}`]
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to search products');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}
