import { ClipboardCheck } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import type { ProductDetailsType, ProductType } from "@/type";
import { useAddToCart } from "@/controllers/cartController";
import { Spinner } from "../ui/spinner";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface Props {
  product: ProductType | ProductDetailsType;
  type: "CARD" | "DETAILS" | "SLIDER";
  onShowModal?: (
    type: string,
    title?: string,
    size?: string,
    data?: unknown
  ) => void;
  quantity?: number;
  variant?: string | null;
}

export const CheckoutButton = ({
  product,
  type,
  onShowModal,
  quantity = 1,
  variant = null,
}: Props) => {
  const { isLoading, fnAddToCart } = useAddToCart(
    product as ProductType,
    quantity,
    variant,
    product?.id,
    onShowModal
  );

  const handleCheckout = () => {
    if (
      "variant_product" in product &&
      product.variant_product == 1 &&
      onShowModal
    ) {
      onShowModal("DETAILS", product?.name, "max-w-4xl", product?.id);
      return;
    } else {
      fnAddToCart();
    }
  };

  const style = {
    CARD: {
      size: "xs",
      variant: "order",
      icon: <ClipboardCheck className="h-2 w-2" />,
    },
    DETAILS: {
      size: "lg",
      variant: "order",
      icon: <ClipboardCheck className="h-4 w-4" />,
    },
  };

  if (type === "SLIDER") {
    return (
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        variant="order"
        className={cn("w-full")}
        size="xs">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ClipboardCheck className="h-4 w-4 hidden md:block text-white" />
            <span className="text-white text-[10px]">Order now</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full"
      variant="order"
      size={style[type].size as VariantProps<typeof buttonVariants>["size"]}>
      {isLoading ? (
        <>
          <Spinner />
          <span>{"Processing..."}</span>
        </>
      ) : (
        <>
          {style[type].icon}
          {"Order now"}
        </>
      )}
    </Button>
  );
};
