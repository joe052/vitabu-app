import Image from "next/image";
import { SITE } from "@/constants";
import { cn } from "@/lib/utils";

const SIZES = { sm: "h-6", md: "h-8", lg: "h-10" };
const TEXT = { sm: "text-sm", md: "text-lg", lg: "text-xl" };

type AppLogoProps = {
  name?: string;
  size?: keyof typeof SIZES;
  withWordmark?: boolean;
};

/**
 * The app mark. Swap public/logo-developers-mania.png (and src/app/icon.png,
 * the favicon) to rebrand - nothing else references them. `alt` is empty on
 * purpose because the wordmark beside it carries the name for screen readers.
 */
const AppLogo = ({
  name = SITE.name,
  size = "md",
  withWordmark = true,
}: AppLogoProps) => {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src="/logo-developers-mania.png"
        alt=""
        width={200}
        height={200}
        // Above the fold on every page, and only 1.7 KB - skip lazy loading and the optimizer.
        loading="eager"
        unoptimized
        className={cn("w-auto", SIZES[size])}
      />
      {withWordmark && (
        <span className={cn("font-semibold", TEXT[size])}>{name}</span>
      )}
    </span>
  );
};

export default AppLogo;
