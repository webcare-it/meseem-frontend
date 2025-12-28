import { useGetProductsByCategory } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { useParams } from "react-router-dom";
import { slugifyToTitle } from "@/helper";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { ProductsSection } from "@/components/card/products-section";
import type { PaginationDataType } from "@/components/common/pagination-wrapper";
import { useState } from "react";

export const CategoriesProductPage = () => {
  const { id, name } = useParams();
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });
  const { data, isLoading } = useGetProductsByCategory(id as string, filters);

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

export const CategoriesSubCategoryProductPage = () => {
  const { subId, subName } = useParams();
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });
  const { data, isLoading } = useGetProductsByCategory(
    subId as string,
    filters
  );

  const products = (data?.data as ProductType[]) || [];
  const paginationData = (data as { meta: PaginationDataType })?.meta || {};

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SeoWrapper title={slugifyToTitle(subName as string)} />

      <ProductsSection
        title={slugifyToTitle(subName as string)}
        products={products}
        pagination={paginationData}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};

export const CategoriesSubSubCategoryProductPage = () => {
  const { subSubId, subSubName } = useParams();
  const [filters, setFilters] = useState<Record<string, unknown>>({ page: 1 });
  const { data, isLoading } = useGetProductsByCategory(
    subSubId as string,
    filters
  );

  const products = (data?.data as ProductType[]) || [];
  const paginationData = (data as { meta: PaginationDataType })?.meta || {};

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SeoWrapper title={slugifyToTitle(subSubName as string)} />

      <ProductsSection
        title={slugifyToTitle(subSubName as string)}
        products={products}
        pagination={paginationData}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};
