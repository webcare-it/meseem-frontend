import { Link } from "react-router-dom";
import { getConfig, getImageUrl } from "@/helper";
import { Image } from "lucide-react";
import { useConfig } from "@/hooks/useConfig";

interface Props {
  type: "DESKTOP" | "MOBILE" | "LANDING-PAGE";
}

export const Logo = ({ type }: Props) => {
  const config = useConfig();
  const logo = getConfig(config, "header_logo")?.value as string;

  if (type === "DESKTOP") {
    return (
      <Link to="/">
        <div className="w-40 h-12 relative overflow-hidden">
          {logo ? (
            <img
              src={getImageUrl(logo as string)}
              alt="logo"
              className="absolute w-full h-full object-contain"
            />
          ) : (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Image className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (type === "LANDING-PAGE") {
    return (
      <Link to="/">
        {logo ? (
          <img
            src={getImageUrl(logo as string)}
            alt="logo"
            className="w-full h-20 object-contain"
          />
        ) : (
          <div className="absolute w-full h-full flex items-center justify-center">
            <Image className="w-6 h-6 text-primary" />
          </div>
        )}
      </Link>
    );
  }

  if (type === "MOBILE") {
    return (
      <Link to="/">
        <div className="w-28 h-10 relative overflow-hidden">
          {logo ? (
            <img
              src={getImageUrl(logo as string)}
              alt="logo"
              className="absolute w-full h-full object-contain"
            />
          ) : (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Image className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </Link>
    );
  }

  return null;
};
