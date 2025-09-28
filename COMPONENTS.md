# Component Structure

This project follows Next.js best practices with a clean separation of concerns:

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js App Router pages
│   ├── [id]/              # Dynamic product detail route
│   │   ├── page.js        # Product detail page
│   │   └── page.module.css
│   ├── page.js            # Home page
│   ├── page.module.css
│   └── layout.js          # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   │   ├── ProductCard.js
│   │   ├── ProductCard.module.css
│   │   ├── ProductImages.js
│   │   ├── ProductImages.module.css
│   │   ├── ProductDescription.js
│   │   ├── ProductDescription.module.css
│   │   ├── CustomerReviews.js
│   │   ├── CustomerReviews.module.css
│   │   └── index.js       # Component exports
│   └── index.js           # Main component exports
├── lib/                   # Utility functions
│   └── api.js            # API functions for data fetching
└── next.config.mjs       # Next.js configuration
```

## 🔧 API Layer (`lib/api.js`)

Centralized API functions for data fetching:
- `getProducts()` - Fetch all products
- `getProduct(id)` - Fetch single product by ID
- `getProductsByCategory(category)` - Fetch products by category
- `searchProducts(query)` - Search products by query

## 🎨 UI Components (`components/ui/`)

### ProductCard
- Displays product thumbnail, title, price, and rating
- Handles navigation to product detail page
- Responsive design with hover effects

### ProductImages
- Main product image display
- Image gallery with thumbnails
- Responsive image handling

### ProductDescription
- Product description and specifications
- SKU, weight, dimensions, stock info
- Product tags display

### CustomerReviews
- Customer review display
- Rating and comment formatting
- Review date formatting

## 🚀 Usage

### Importing Components
```javascript
// Individual imports
import ProductCard from '../components/ui/ProductCard';
import ProductImages from '../components/ui/ProductImages';

// Or using the index file
import { ProductCard, ProductImages } from '../components';
```

### Using API Functions
```javascript
import { getProducts, getProduct } from '../lib/api';

// In a server component
const products = await getProducts();
const product = await getProduct(id);
```

## ✨ Benefits

1. **Separation of Concerns**: API logic separated from UI components
2. **Reusability**: Components can be easily reused across pages
3. **Maintainability**: Each component has its own CSS module
4. **Type Safety**: JSDoc comments for better IDE support
5. **Performance**: Server-side rendering with optimized components
6. **Scalability**: Easy to add new components and API functions
