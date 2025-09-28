import styles from "./ProductDescription.module.css";

/**
 * ProductDescription component for displaying product details and specifications
 * @param {Object} product - Product object containing description, sku, weight, dimensions, etc.
 * @param {string} product.description - Product description
 * @param {string} product.sku - Product SKU
 * @param {number} product.weight - Product weight
 * @param {Object} product.dimensions - Product dimensions {width, height, depth}
 * @param {number} product.stock - Available stock
 * @param {Array} product.tags - Product tags
 */
export default function ProductDescription({ product }) {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      <div className={styles.productDetails}>
        <h3>Product Details</h3>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>SKU:</span>
            <span className={styles.detailValue}>{product.sku}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Weight:</span>
            <span className={styles.detailValue}>{product.weight}g</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Stock:</span>
            <span className={styles.detailValue}>{product.stock} available</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Dimensions:</span>
            <span className={styles.detailValue}>
              {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth} cm
            </span>
          </div>
        </div>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className={styles.tags}>
          <h3>Tags</h3>
          <div className={styles.tagList}>
            {product.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
