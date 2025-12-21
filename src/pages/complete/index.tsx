import { SeoWrapper } from "@/components/common/seo-wrapper";
import { BaseLayout } from "@/components/layout/base-layout";
import { Skeleton } from "@/components/common/skeleton";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useGetOrderSuccessful } from "@/api/queries/userOrders";
import type { InvoiceType } from "@/type";
import {
  OrderDetailsCard,
  OrderDetailsSkeleton,
} from "@/components/card/order-details";
import {
  useGtmTracker,
  type PurchaseTrackerType,
  type PersonalDataType,
} from "@/hooks/useGtmTracker";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getLocalStorage,
  removeCurrencySymbol,
  removeLocalStorage,
  setLocalStorage,
} from "@/helper";

export const OrderCompletePage = () => {
  const hasTracked = useRef(false);
  const [ip, setIp] = useState("");

  const { purchaseTracker } = useGtmTracker();
  const { data, isLoading } = useGetOrderSuccessful();
  const order = useMemo(() => (data?.invoice as InvoiceType) || {}, [data]);

  useEffect(() => {
    removeLocalStorage("selected_shipping_method");
    if (!ip) {
      fetch("https://api.ipify.org?format=json")
        .then((res) => res?.json())
        .then((data) => setIp(data?.ip));
    }
  }, [ip]);

  useEffect(() => {
    if (order) {
      const productInfo: PurchaseTrackerType = {
        transaction_id: order?.order_code || "",
        coupon: order?.coupon || "",
        tax: removeCurrencySymbol(order?.tax?.toString() || "0"),
        shipping: removeCurrencySymbol(order?.shipping_cost?.toString() || "0"),
        value: removeCurrencySymbol(order?.subtotal?.toString() || "0") || 0,
        customer_type:
          (order?.customer_type?.toLowerCase() as "new" | "returning") || "new",
        items: order?.order_items?.map((item) => ({
          item_id: item?.product_id?.toString() || "",
          item_name: item?.product_name || "",
          item_price: removeCurrencySymbol(item?.price?.toString() || "0") || 0,
          item_category: item?.category_name || "",
          item_quantity: item?.quantity || 1,
        })),
      };

      const personalInfo: PersonalDataType = {
        ip_address: ip || navigator.userAgent,
        email: order?.shipping_address?.email || order?.user?.email || "",
        phone: order?.shipping_address?.phone || order?.user?.phone || "",
        name: order?.shipping_address?.name || order?.user?.name || "",
        address: order?.shipping_address?.address || "",
      };
      if (
        order &&
        order?.order_code &&
        order?.order_items?.length > 0 &&
        ip &&
        !hasTracked.current &&
        !getLocalStorage("order_completed")
      ) {
        purchaseTracker(productInfo, personalInfo);
        hasTracked.current = true;
        setLocalStorage("order_completed", "true");
      }
    }
  }, [order, purchaseTracker, ip]);

  if (isLoading) {
    return (
      <>
        <SeoWrapper title={"Order Successful!"} />
        <BaseLayout isShowMegaMenu={false} isContainer={false}>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-12">
                <Skeleton className="h-20 w-20 mx-auto rounded-full mb-6" />
                <Skeleton className="h-8 w-64 mx-auto mb-4" />
                <Skeleton className="h-4 w-48 mx-auto" />
              </div>
              <OrderDetailsSkeleton />
            </div>

            <FlowerAnimation />
          </div>
        </BaseLayout>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <SeoWrapper title={"Order Successful!"} />
        <BaseLayout isShowMegaMenu={false} isContainer={false}>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  {"Order not found"}
                </h3>
              </div>
            </div>
          </div>
        </BaseLayout>
      </>
    );
  }

  return (
    <>
      <SeoWrapper title={"Order Successful!"} />
      <BaseLayout isShowMegaMenu={false} isContainer={false}>
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 relative">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="inline-block mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </motion.div>

              <h1 className="text-4xl font-bold text-green-600 mb-2">
                {"Order Successful!"}
              </h1>
              <p className="text-lg text-muted-foreground dark:text-gray-300">
                {"Thank you for your purchase."}
              </p>
            </motion.div>

            <OrderDetailsCard order={order} path="/track-order" />
          </div>

          <FlowerAnimation />
        </div>
      </BaseLayout>
    </>
  );
};

const FlowerAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <img
          key={i}
          src="/flower.png"
          alt="flower"
          className="absolute w-10 h-10 animate-fall"
          style={{
            animationDuration: `${Math.random() * 5 + 3}s`,
            animationDelay: `${Math.random() * 5}s`,
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}vh`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};
