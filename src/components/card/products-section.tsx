import type { ProductType } from "@/type";
import { BaseLayout } from "@/components/layout/base-layout";
import { SectionTitle } from "@/components/common/section-title";
import { CardLayout } from "@/components/common/card-layout";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { NoDataFound } from "@/components/common/no-data-found";
import {
  PaginationWrapper,
  type PaginationDataType,
} from "../common/pagination-wrapper";

interface Props {
  title: string;
  products: ProductType[];
  isLoading: boolean;
  pagination: PaginationDataType;
  onPageChange: (page: number) => void;
}

export const ProductsSection = ({
  title,
  products,
  isLoading,
  pagination,
  onPageChange,
}: Props) => {
  return (
    <BaseLayout>
      <section className="mb-10 md:mb-20 container mx-auto mt-10">
        <SectionTitle title={title} />
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
            <div className="w-full">
              <NoDataFound title={"No products found"} />
            </div>
          )}
        </CardLayout>

        {Object.keys(pagination)?.length > 0 && products?.length > 0 && (
          <PaginationWrapper
            paginationData={pagination}
            onPageChange={onPageChange}
          />
        )}
      </section>
    </BaseLayout>
  );
};
