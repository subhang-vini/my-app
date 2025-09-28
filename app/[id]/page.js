import Link from "next/link";
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';
import { getProduct } from "../../lib/api";
import ProductImages from "../../components/ui/ProductImages";
import ProductDescription from "../../components/ui/ProductDescription";
import CustomerReviews from "../../components/ui/CustomerReviews";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AddToCartButton from "../../components/ui/AddToCartButton";
import styles from "./page.module.css";

async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
        return (
          <div className={styles.page}>
            <main className={styles.main}>
              <div className={styles.error}>
                <h1>Product Not Found</h1>
                <p>The product you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/" className={styles.backButton} prefetch={true}>
                  ← Back to Products
                </Link>
              </div>
            </main>
          </div>
        );
  }

      return (
        <div className={styles.page}>
          <main className={styles.main}>
            <Link href="/" className={styles.backButton} prefetch={true}>
              ← Back to Products
            </Link>

            <ViewTransition>
              <div className={styles.productDetail}>
                <ProductImages product={product} />

                <div className={styles.productInfo}>
                  <h1
                    className={styles.productTitle}
                    style={{
                      viewTransitionName: `product-title-${product.id}`,
                    }}
                  >
                    {product.title}
                  </h1>

                  <div className={styles.productMeta}>
                    <div
                      className={styles.rating}
                      style={{
                        viewTransitionName: `product-rating-${product.id}`,
                      }}
                    >
                      ⭐ {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                    </div>
                    <div className={styles.brand}>
                      Brand: {product.brand}
                    </div>
                    <div className={styles.category}>
                      Category: {product.category}
                    </div>
                  </div>

                  <div className={styles.priceSection}>
                    <div
                      className={styles.currentPrice}
                      style={{
                        viewTransitionName: `product-price-${product.id}`,
                      }}
                    >
                      ${product.price}
                    </div>
                    {product.discountPercentage > 0 && (
                      <div className={styles.discount}>
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  <div className={styles.cartButton}>
                    <AddToCartButton product={product} variant="detail" />
                  </div>

                  <ProductDescription product={product} />
                  <CustomerReviews reviews={product.reviews} />
                </div>
              </div>
            </ViewTransition>
          </main>
        </div>
      );
}

export default function Wrapper({...props}) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail {...props} />
        </Suspense>
    )
}