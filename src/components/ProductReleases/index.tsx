import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import {
  products,
  formatReleaseDate,
  type Product,
} from "@site/src/data/products";
import styles from "./styles.module.css";

function ProductCard({ product }: { product: Product }): ReactNode {
  return (
    <div className={styles.product}>
      <div className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          {product.icon}
        </span>
        <div className={styles.headText}>
          <Heading as="h2" className={styles.title}>
            {product.label}
          </Heading>
          <span className={styles.prefix}>
            Prefijo Jira <code>{product.prefix}</code>
          </span>
        </div>
        {product.docLink && (
          <Link className={styles.docLink} to={product.docLink}>
            Documentación →
          </Link>
        )}
      </div>

      {product.releases.length === 0 ? (
        <p className={styles.empty}>Aún no hay versiones publicadas.</p>
      ) : (
        <ul className={styles.releaseList}>
          {product.releases.map((release) => (
            <li key={release.version} className={styles.release}>
              <Link to={release.href} className={styles.version}>
                v{release.version}
              </Link>
              <span className={styles.date}>
                {formatReleaseDate(release.date)}
              </span>
              <Link to={release.href} className={styles.notes}>
                Ver nota →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProductReleases(): ReactNode {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
