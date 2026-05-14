import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "SAMM Web",
    icon: "🖥️",
    description: (
      <>
        CMMS 100&nbsp;% web para gestión de mantenimiento preventivo y
        correctivo, activos, órdenes de trabajo y reportes desde cualquier
        lugar.
      </>
    ),
    link: "/docs/category/sammnew",
  },
  {
    title: "Utilidades – Reportes",
    icon: "📊",
    description: (
      <>
        Microservicio de generación de reportes sobre SSRS. Parametrización,
        renderizado y distribución de reportes integrados con SAMM.
      </>
    ),
    link: "/docs/util-reportes",
  },
  {
    title: "App Técnicos",
    icon: "📱",
    description: (
      <>
        Aplicación offline-first para técnicos de campo. Registro de servicios,
        captura de firma digital y sincronización automática.
      </>
    ),
    link: "/docs/app-tecnicos",
  },
];

function Feature({ title, icon, description, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div
        className="text--center"
        style={{ fontSize: "3rem", padding: "1rem 0" }}
      >
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary button--sm" to={link}>
          Ver documentación →
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
