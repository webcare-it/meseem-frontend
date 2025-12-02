import { Discount } from "@/components/common/discount";
import { WishlistButton } from "@/components/common/wishlist-button";
import { getImageUrl } from "@/helper";
import { cn } from "@/lib/utils";
import type { ProductDetailsType, ProductType } from "@/type";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { MagnifyImage } from "./magnify";
import { OptimizedImage } from "../common/optimized-image";

interface Props {
  product: ProductDetailsType;
  selectedVariantImage?: string | null;
  height?: string;
}

export const ImageSection = ({
  product,
  selectedVariantImage,
  height,
}: Props) => {
  const [img, setImg] = useState<string | null>(selectedVariantImage || null);

  const images = product?.photos || [];

  useEffect(() => {
    setImg(selectedVariantImage || product?.thumbnail_image || null);
  }, [selectedVariantImage, product?.thumbnail_image]);

  return (
    <div className="space-y-2.5 md:space-y-4 w-full overflow-hidden">
      <div className="flex gap-1 md:gap-2">
        {images?.length > 1 && (
          <div
            className={`w-12 md:w-20 mb-4 flex flex-col gap-2 max-h-[250px] md:max-h-[${
              height || "620px"
            }] overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide`}>
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setImg(image?.path);
                }}
                className={cn(
                  "flex-shrink-0 cursor-pointer w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all",
                  image?.path === img
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                )}
                aria-label={`View image ${index + 1}`}>
                <OptimizedImage
                  src={image?.path}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 relative group">
          <div className="aspect-[16/17] overflow-hidden rounded-xl border border-border shadow-lg">
            {img ? (
              <MagnifyImage
                src={getImageUrl(img)}
                alt={product?.name}
                zoomFactor={2}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-16 h-16 text-muted-foreground" />
              </div>
            )}

            <WishlistButton
              product={product as unknown as ProductType}
              size="DEFAULT"
            />
          </div>

          <Discount product={product} type="DETAILS" />
        </div>
      </div>
    </div>
  );
};
