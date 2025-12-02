import { ClipboardCheck } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import type { ProductDetailsType, ProductType } from "@/type";
import { useAddToCart } from "@/controllers/cartController";
import { Spinner } from "../ui/spinner";
import type { VariantProps } from "class-variance-authority";
import type { RootStateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductType | ProductDetailsType;
  type: "CARD" | "DETAILS" | "SLIDER";
  quantity?: number;
  variant?: string | null;
}

export const CheckoutButton = ({
  product,
  type,
  quantity = 1,
  variant = null,
}: Props) => {
  const navigate = useNavigate();

  const { isLoading, fnAddToCart } = useAddToCart(
    product as ProductType,
    quantity,
    variant
  );

  const cart = useSelector((state: RootStateType) => state.cart?.items);

  const handleCheckout = () => {
    const isExist = cart?.find((item) => item.productId === product?.id);

    if (isExist) {
      navigate("/checkout");
      return;
    } else {
      fnAddToCart(true as boolean);
    }
  };

  const style = {
    CARD: {
      size: "xs",
      variant: "secondary",
      icon: <ClipboardCheck className="h-2 w-2" />,
    },
    DETAILS: {
      size: "lg",
      variant: "secondary",
      icon: <ClipboardCheck className="h-4 w-4" />,
    },
  };

  if (type === "SLIDER") {
    return (
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full border border-primary"
        size="xs"
        variant="secondary">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ClipboardCheck className="h-4 w-4 hidden md:block text-primary" />
            <span className="text-primary text-[10px]">{"Checkout"}</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full border"
      size={style[type].size as VariantProps<typeof buttonVariants>["size"]}
      variant={
        style[type].variant as VariantProps<typeof buttonVariants>["variant"]
      }>
      {isLoading ? (
        <>
          <Spinner />
          <span>{"Processing..."}</span>
        </>
      ) : (
        <>
          {style[type].icon}
          {"Checkout"}
        </>
      )}
    </Button>
  );
};
