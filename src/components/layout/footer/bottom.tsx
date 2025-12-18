import { OptimizedImage } from "@/components/common/optimized-image";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";

export const BottomBar = () => {
  const config = useConfig();
  const img = getConfig(config, "payment_method_images")?.value as string;
  const copyright =
    (getConfig(config, "frontend_copyright_text")?.value as string) ||
    `${new Date().getFullYear()} All rights reserved.`;

  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:py-4 mt-4 md:mt-0 justify-between gap-4 text-sm">
      <p className="text-white">© {copyright}</p>
      <div className="w-full max-w-sm h-10 relative overflow-hidden">
        <OptimizedImage
          className="absolute w-full h-full object-contain"
          src={img || ""}
          alt="payment image"
        />
      </div>
    </div>
  );
};
