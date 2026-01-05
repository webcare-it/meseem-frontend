import { useGetProductsForHome } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { SectionTitle } from "@/components/common/section-title";
import { CardLayout } from "@/components/common/card-layout";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { useSearchParams } from "react-router-dom";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { NoDataFound } from "@/components/common/no-data-found";
import { BaseLayout } from "@/components/layout/base-layout";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import {
  PaginationWrapper,
  type PaginationDataType,
} from "@/components/common/pagination-wrapper";
import { useState } from "react";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type") || "";
  const query = searchParams.get("query") || "";
  const params = { query_key: query, ...(type.trim() ? { type } : {}) };
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });

  const { data, isLoading } = useGetProductsForHome("search", {
    ...params,
    ...filters,
  });

  const products = (data?.data as ProductType[]) || [];
  const pagination = (data as { meta: PaginationDataType })?.meta || {};

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SeoWrapper title={`Search results for "${query?.toUpperCase()}"`} />

      <BaseLayout>
        <section className="mb-10 md:mb-20 container mx-auto mt-10">
          <SectionTitle
            title={`Search results for "${query?.toUpperCase()}"`}
          />
          <CardLayout>
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products?.length > 0 ? (
              products?.map((product, i: number) => (
                <AnimationWrapper
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}>
                  <ProductCard key={product.id} product={product} />
                </AnimationWrapper>
              ))
            ) : (
              <div className="col-span-full px-4">
                <NoDataFound title={"No products found"} />
              </div>
            )}
          </CardLayout>

          {Object.keys(pagination)?.length > 0 && products?.length > 0 && (
            <PaginationWrapper
              paginationData={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </BaseLayout>
    </>
  );
};
