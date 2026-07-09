/**
 * Swizzled (ejected) from @docusaurus/theme-classic.
 * Cambios respecto al original:
 * - Botón "Volver a Versiones" antes del contenido del post.
 * - El sidebar de "otras versiones" se filtra para mostrar únicamente las
 *   versiones del mismo producto que se está viendo (usa las etiquetas del
 *   post y el catálogo de `src/data/products.ts` como fuente de verdad).
 */
import React, { type ReactNode } from "react";
import clsx from "clsx";
import { HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/plugin-content-blog/client";
import Link from "@docusaurus/Link";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import BlogPostPageStructuredData from "@theme/BlogPostPage/StructuredData";
import TOC from "@theme/TOC";
import ContentVisibility from "@theme/ContentVisibility";
import { products } from "@site/src/data/products";
import type { Props } from "@theme/BlogPostPage";
import type { BlogSidebar } from "@docusaurus/plugin-content-blog";

/** Restringe el sidebar a las versiones del producto del post actual. */
function useProductSidebar(
  sidebar: BlogSidebar,
  frontMatterTags: unknown,
): BlogSidebar {
  const tags = Array.isArray(frontMatterTags)
    ? frontMatterTags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const product = products.find((p) => tags.includes(p.slug));

  if (!product || product.releases.length === 0) {
    return sidebar;
  }

  const releaseHrefs = product.releases.map((release) => release.href);
  const items = sidebar.items.filter((item) =>
    releaseHrefs.some((href) => item.permalink.endsWith(href)),
  );

  return {
    title: `Otras versiones de ${product.label}`,
    items: items.length > 0 ? items : sidebar.items,
  };
}

function BlogPostPageContent({
  sidebar,
  children,
}: {
  sidebar: BlogSidebar;
  children: ReactNode;
}): ReactNode {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const productSidebar = useProductSidebar(sidebar, frontMatter.tags);

  return (
    <BlogLayout
      sidebar={productSidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <ContentVisibility metadata={metadata} />

      <Link
        to="/versiones"
        className="button button--secondary button--sm margin-bottom--md"
      >
        ← Volver a Versiones
      </Link>

      <BlogPostItem>{children}</BlogPostItem>

      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
