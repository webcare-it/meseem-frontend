import { useGetProductsByBrand } from "@/api/queries/useProducts";
import { ProductsCard } from "@/components/card/products";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { slugifyToTitle } from "@/helper";
import type { ProductType } from "@/type";
import { useParams } from "react-router-dom";

export const BrandsPage = () => {
  const { name } = useParams();
  const { data, isLoading } = useGetProductsByBrand();

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
