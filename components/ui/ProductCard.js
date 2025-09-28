import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from 'react';
import AddToCartButton from "./AddToCartButton";
import styles from "./ProductCard.module.css";

/**
 * ProductCard component for displaying product information in a card format
 * @param {Object} product - Product object containing id, title, price, rating, thumbnail
 * @param {string} product.id - Product ID
 * @param {string} product.title - Product title
 * @param {number} product.price - Product price
 * @param {number} product.rating - Product rating
 * @param {string} product.thumbnail - Product thumbnail image URL
 */
export default function ProductCard({ product }) {
  return (
    <ViewTransition>
      <Link href={`/${product.id}`} className={styles.productCard} prefetch={true}>
        <div className={styles.productImage}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={200}
            className={styles.image}
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
          />
        </div>
        <div className={styles.productInfo}>
          <h3 
            className={styles.productTitle}
            style={{
              viewTransitionName: `product-title-${product.id}`,
            }}
          >
            {product.title}
          </h3>
          <div 
            className={styles.productPrice}
            style={{
              viewTransitionName: `product-price-${product.id}`,
            }}
          >
            ${product.price}
          </div>
          <div 
            className={styles.productRating}
            style={{
              viewTransitionName: `product-rating-${product.id}`,
            }}
          >
            ⭐ {product.rating.toFixed(1)}
          </div>
          <div className={styles.cartButton}>
            <AddToCartButton product={product} variant="card" />
          </div>
        </div>
      </Link>
    </ViewTransition>
  );
}
