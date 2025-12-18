import { useGetAllProducts } from "@/api/queries/useProducts";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { CardLayout } from "@/components/common/card-layout";
import { NoDataFound } from "@/components/common/no-data-found";
import { SectionTitle } from "@/components/common/section-title";
import { PaginationWrapper } from "@/components/common/pagination-wrapper";
import type { ProductType } from "@/type";
import { BaseLayout } from "@/components/layout/base-layout";
import type { PaginationDataType } from "@/components/common/pagination-wrapper";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { FilterProduct } from "@/components/common/filter-product";
import { useState } from "react";

export const ProductsPage = () => {
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });
  const { data, isLoading } = useGetAllProducts(filters);

  const products = (data?.data as ProductType[]) || [];
  const paginationData = (data as { meta: PaginationDataType })?.meta || {};

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SeoWrapper title={"All Products"} />
      <BaseLayout>
        <div className="flex items-center justify-between mt-8 md:mt-10 mb-4">
          <SectionTitle title={"All Products"} className="" />
          <FilterProduct filters={filters} setFilters={setFilters} />
        </div>

        {isLoading ? (
          <CardLayout>
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </CardLayout>
        ) : products?.length > 0 ? (
          <CardLayout>
            {products &&
              products?.length > 0 &&
              products?.map((product, i: number) => (
                <AnimationWrapper
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}>
                  <ProductCard key={product.id} product={product} />
                </AnimationWrapper>
              ))}
          </CardLayout>
        ) : (
          <NoDataFound title={"No products found"} />
        )}

        {Object.keys(paginationData)?.length > 0 && products?.length > 0 && (
          <PaginationWrapper
            paginationData={paginationData}
            onPageChange={handlePageChange}
          />
        )}
      </BaseLayout>
    </>
  );
};
