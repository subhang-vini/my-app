import Link from "next/link";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ui/ProductCard";
import styles from "./page.module.css";

export default async function Home() {
  const data = await getProducts();
  const products = data.products || [];

      return (
        <div className={styles.page}>
          <main className={styles.main}>
            <h1 className={styles.title}>Products</h1>
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      );
}
