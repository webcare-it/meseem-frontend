import { useGetProductsByCategory } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { useParams } from "react-router-dom";
import { slugifyToTitle } from "@/helper";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { ProductsCard } from "@/components/card/products";

export const CategoriesProductPage = () => {
  const { id, name } = useParams();
  const { data, isLoading } = useGetProductsByCategory(id as string);

  const products = (data?.data as ProductType[]) || [];

  return (
    <>
      <SeoWrapper title={slugifyToTitle(name as string)} />

      <ProductsCard
        title={slugifyToTitle(name as string)}
        products={products}
        isLoading={isLoading}
      />
    </>
  );
};

export const CategoriesSubCategoryProductPage = () => {
  const { subId, subName } = useParams();
  const { data, isLoading } = useGetProductsByCategory(subId as string);

  const products = (data?.data as ProductType[]) || [];

  return (
    <>
      <SeoWrapper title={slugifyToTitle(subName as string)} />

      <ProductsCard
        title={slugifyToTitle(subName as string)}
        products={products}
        isLoading={isLoading}
      />
    </>
  );
};

export const CategoriesSubSubCategoryProductPage = () => {
  const { subSubId, subSubName } = useParams();
  const { data, isLoading } = useGetProductsByCategory(subSubId as string);

  const products = (data?.data as ProductType[]) || [];

  return (
    <>
      <SeoWrapper title={slugifyToTitle(subSubName as string)} />

      <ProductsCard
        title={slugifyToTitle(subSubName as string)}
        products={products}
        isLoading={isLoading}
      />
    </>
  );
};
