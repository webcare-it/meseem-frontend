import { useEffect } from "react";
import { useGetConfig } from "@/api/queries/useGetConfig";
import { ConfigContext, type ConfigType } from "@/hooks/useConfig";
import { getConfig } from "@/helper";
import { updatePrimaryColor, updatePrimaryForeground } from "@/lib/chroma";
import { MaintenancePage } from "@/pages/utils-pages/maintenance";
import { ServerError } from "@/pages/utils-pages/server";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RootPageLoading } from "@/components/layout/root-loading";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetConfig();

  const config = data?.data as ConfigType[];
  const primaryColor = getConfig(config, "base_color")?.value;
  const secondaryColor = getConfig(config, "base_hov_color")?.value;

  useEffect(() => {
    if (primaryColor && typeof primaryColor === "string") {
      updatePrimaryColor(primaryColor);
    }
    if (secondaryColor && typeof secondaryColor === "string") {
      updatePrimaryForeground(secondaryColor);
    }
  }, [primaryColor, secondaryColor]);

  const isMaintenance = getConfig(config, "maintenance_mode")?.value;

  if (isMaintenance === "1") {
    return <MaintenancePage />;
  }

  if (error) {
    return <ServerError />;
  }

  if (isLoading) {
    return <RootPageLoading />;
  }

  const clientId = data?.google_client_id || null;

  return (
    <ConfigContext.Provider value={config}>
      {clientId ? (
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      ) : (
        <>{children}</>
      )}
    </ConfigContext.Provider>
  );
};
