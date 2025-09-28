import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from 'react';
import styles from "./ProductImages.module.css";

/**
 * ProductImages component for displaying product images with gallery
 * @param {Object} product - Product object containing images and thumbnail
 * @param {string} product.thumbnail - Main product image URL
 * @param {Array} product.images - Array of product image URLs
 * @param {string} product.title - Product title for alt text
 */
export default function ProductImages({ product }) {
  return (
    <ViewTransition>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className={styles.image}
            priority
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
          />
        </div>
        {product.images && product.images.length > 1 && (
          <div className={styles.imageGallery}>
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </ViewTransition>
  );
}
