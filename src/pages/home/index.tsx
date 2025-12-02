import { HeroSection } from "./hero";
import { BaseLayout } from "@/components/layout/base-layout";
import { CategoriesSection } from "./categories";
import { BestSellerSection } from "./best";
import { FeaturedProductsSection } from "./feature";
import {
  FlashDealSection,
  PromotionalSectionOne,
  PromotionalSectionThree,
  PromotionalSectionTwo,
} from "./promotional";
import { TodaysDealSection } from "./today";
import { CategoryProductsSection } from "./category";
import { TrustBadgeSection } from "./trust-badge";
import { removeLocalStorage } from "@/helper";
import React, { useEffect, useMemo } from "react";
import { useGetHomeProducts } from "@/api/queries/useGetHome";

export const HomePage = () => {
  const { data: homeSections, sectionLoading } = useGetHomeProducts();

  useEffect(() => {
    removeLocalStorage("coupon_code");
    removeLocalStorage("order_completed");
  }, []);

  const orderedSections = useMemo(() => {
    const components = {
      hero: <HeroSection />,
      categories: <CategoriesSection />,
      trust_badge: <TrustBadgeSection />,
      todays_deal: (
        <TodaysDealSection
          isLoading={sectionLoading}
          products={homeSections?.todays_deal?.data || []}
        />
      ),
      promotional_section_one: <PromotionalSectionOne />,
      best_seller_section: (
        <BestSellerSection
          isLoading={sectionLoading}
          products={homeSections?.best_selling?.data || []}
        />
      ),
      flash_deal_section: (
        <FlashDealSection
          isLoading={sectionLoading}
          banners={homeSections?.flash_deal?.data || []}
        />
      ),
      promotional_section_two: <PromotionalSectionTwo />,
      category_products_section: <CategoryProductsSection />,
      promotional_section_three: <PromotionalSectionThree />,
      featured_products_section: (
        <FeaturedProductsSection
          isLoading={sectionLoading}
          products={homeSections?.featured?.data || []}
        />
      ),
    };

    return [
      { key: "hero", component: components.hero },
      { key: "categories", component: components.categories },
      { key: "trust_badge", component: components.trust_badge },
      { key: "todays_deal", component: components.todays_deal },
      {
        key: "promotional_section_one",
        component: components.promotional_section_one,
      },
      {
        key: "best_seller_section",
        component: components.best_seller_section,
      },
      {
        key: "flash_deal_section",
        component: components.flash_deal_section,
      },
      {
        key: "category_products_section",
        component: components.category_products_section,
      },
      {
        key: "promotional_section_two",
        component: components.promotional_section_two,
      },
      {
        key: "featured_products_section",
        component: components.featured_products_section,
      },
      {
        key: "promotional_section_three",
        component: components.promotional_section_three,
      },
    ];
  }, [homeSections, sectionLoading]);

  return (
    <BaseLayout isShowNewsletterSection={true}>
      <section className="flex flex-col gap-10 md:gap-20">
        {orderedSections.map((section) => (
          <React.Fragment key={section.key}>{section.component}</React.Fragment>
        ))}
      </section>
    </BaseLayout>
  );
};
