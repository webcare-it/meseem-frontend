import { Separator } from "@/components/ui/separator";
import { BottomBar } from "./bottom";
import { ContactFooter } from "./contact";
import { CategoriesFooter } from "./categories";
import { BrandFooter } from "./brand";
import { AboutUsFooter } from "./about";
import { getConfig, getImageUrl } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { Image } from "lucide-react";
import { SubscribeFooter } from "./subscribe";

export const Footer = ({
  isShowNewsletterSection,
}: {
  isShowNewsletterSection?: boolean;
}) => {
  const config = useConfig();
  const logo = getConfig(config, "footer_logo")?.value as string;
  const description = getConfig(config, "about_us_description")
    ?.value as string;

  return (
    <>
      {isShowNewsletterSection && <SubscribeFooter />}
      <div className="bg-gray-900 border-t text-white pt-10 md:pt-16 border-border pb-24 md:pb-0">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="flex flex-col gap-3">
              <div className="w-full h-20 relative overflow-hidden">
                {logo?.length > 0 ? (
                  <img
                    className="absolute w-full h-full object-contain"
                    src={getImageUrl(logo as string)}
                    alt="logo"
                  />
                ) : (
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
            <CategoriesFooter />
            <BrandFooter />
            <AboutUsFooter />
            <ContactFooter />
          </div>
          <Separator className="bg-muted mt-4" />
          <BottomBar />
        </div>
      </div>
    </>
  );
};
