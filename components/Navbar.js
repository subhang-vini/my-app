'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "./ui/CartIcon";
import ThemeToggle from "./ui/ThemeToggle";
import styles from "./Navbar.module.css";

/**
 * Navbar component for top-level navigation
 */
export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Products' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} prefetch={true}>
          <span className={styles.logoIcon}>🛍️</span>
          <span className={styles.logoText}>Product Store</span>
        </Link>

        <div className={styles.navItems}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.active : ''
              }`}
              prefetch={true}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.cartSection}>
          <ThemeToggle />
          <CartIcon />
        </div>
      </div>
    </nav>
  );
}
