import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import ProductReleases from "@site/src/components/ProductReleases";

export default function Versiones(): ReactNode {
  return (
    <Layout
      title="Versiones"
      description="Versiones liberadas por producto de IDAE Soluciones y sus notas de novedades."
    >
      <main className="container margin-vert--lg">
        <Heading as="h1">Versiones por producto</Heading>
        <p>
          Aquí encuentras el historial de versiones liberadas y el enlace a la
          nota de novedades de cada una.
        </p>
        <ProductReleases />
      </main>
    </Layout>
  );
}
