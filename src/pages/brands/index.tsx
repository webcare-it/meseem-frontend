import { useGetProductsByBrand } from "@/api/queries/useProducts";
import { ProductsSection } from "@/components/card/products-section";
import type { PaginationDataType } from "@/components/common/pagination-wrapper";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { slugifyToTitle } from "@/helper";
import type { ProductType } from "@/type";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const BrandsPage = () => {
  const { name } = useParams();
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });
  const { data, isLoading } = useGetProductsByBrand(filters);

  const products = (data?.data as ProductType[]) || [];
  const paginationData = (data as { meta: PaginationDataType })?.meta || {};

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SeoWrapper title={slugifyToTitle(name as string)} />

      <ProductsSection
        title={slugifyToTitle(name as string)}
        products={products}
        pagination={paginationData}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};
