import {
  HomeSectionTitle,
  SectionTitleSkeleton,
} from "@/components/common/section-title";
import { useGetCategoryProductsForHome } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { slugify } from "@/helper";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { CardLayout } from "@/components/common/card-layout";
import { useIsMobile, useIsTablet } from "@/hooks/useMobile";

interface FormatType {
  categoryId: string;
  name: string;
  products: { data: ProductType[] };
  hasProducts: boolean;
  isLoading: boolean;
}

export const CategoryProductsSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const initialLength = isMobile ? 2 : isTablet ? 5 : 6;
  const { data, isLoading } = useGetCategoryProductsForHome();
  const formatted = (data?.data as FormatType[]) || [];

  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <section key={i} className="mb-10 md:mb-20">
              <SectionTitleSkeleton />
              <div className="w-full">
                <CardLayout>
                  {Array.from({ length: initialLength }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </CardLayout>
              </div>
            </section>
          ))}
        </>
      ) : (
        formatted?.length > 0 &&
        formatted?.map((category) => {
          const hasProducts =
            category?.products && category?.products?.data?.length > 0;
          return hasProducts ? (
            <section key={category?.categoryId}>
              <HomeSectionTitle
                title={category?.name}
                href={`/categories/${category?.categoryId}/${slugify(
                  category?.name
                )}`}>
                <CardLayout>
                  {category?.products &&
                    category?.products?.data?.length > 0 &&
                    category?.products?.data
                      ?.slice(0, initialLength)
                      ?.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                      ))}
                </CardLayout>
              </HomeSectionTitle>
            </section>
          ) : null;
        })
      )}
    </>
  );
};
