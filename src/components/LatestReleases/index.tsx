import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import {
  productsWithReleases,
  formatReleaseDate,
} from "@site/src/data/products";
import styles from "./styles.module.css";

export default function LatestReleases(): ReactNode {
  const items = productsWithReleases();
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" className={styles.heading}>
            Últimas versiones
          </Heading>
          <Link to="/versiones" className={styles.allLink}>
            Ver todas por producto →
          </Link>
        </div>
        <div className={styles.grid}>
          {items.map((product) => {
            const latest = product.releases[0];
            return (
              <Link
                key={product.slug}
                to={latest.href}
                className={styles.card}
              >
                <span className={styles.icon} aria-hidden="true">
                  {product.icon}
                </span>
                <span className={styles.product}>{product.label}</span>
                <span className={styles.version}>v{latest.version}</span>
                <span className={styles.date}>
                  {formatReleaseDate(latest.date)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
