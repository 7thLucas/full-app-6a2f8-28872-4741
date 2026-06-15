import { useEffect, useState } from "react";
import { useConfigurables } from "~/modules/configurables";

/**
 * RedirectPage — shows a branded loading screen briefly, then redirects
 * the user directly to the store URL. This avoids X-Frame-Options / CSP
 * blocking that prevents the store from being embedded in an iframe.
 */
export default function IndexPage() {
  const { config, loading } = useConfigurables();
  const [countdown, setCountdown] = useState(2);

  const appName = config?.appName || "ShopCart BD";
  const storeUrl = config?.webviewUrl || "https://shopcartbd.vercel.app/";
  const logoUrl = config?.logoUrl;
  const tagline = config?.tagline || "Your one-stop online shop";
  const bgColor = config?.loadingBackgroundColor || "#FFFFFF";
  const accentColor = config?.loadingSpinnerColor || "#E63946";

  // Redirect as soon as configurables are resolved
  useEffect(() => {
    if (loading) return;

    // Immediately kick off the redirect
    const redirectTimer = setTimeout(() => {
      window.location.replace(storeUrl);
    }, 1800);

    // Countdown display
    const tick = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(tick);
    };
  }, [loading, storeUrl]);

  if (loading) {
    return <div className="fixed inset-0" style={{ backgroundColor: bgColor }} />;
  }

  const showLogo = logoUrl && logoUrl !== "FILL_LOGO_URL_HERE";

  return (
    <>
      {/* Meta refresh as a fallback in case JS is blocked */}
      <meta httpEquiv="refresh" content={`2;url=${storeUrl}`} />

      <div
        className="fixed inset-0 flex flex-col items-center justify-center gap-6 px-6"
        style={{ backgroundColor: bgColor }}
      >
        {/* Logo or app name */}
        {showLogo ? (
          <img
            src={logoUrl}
            alt={appName}
            className="h-20 w-auto object-contain"
            draggable={false}
          />
        ) : (
          <span
            className="text-3xl font-bold tracking-tight select-none"
            style={{ color: accentColor }}
          >
            {appName}
          </span>
        )}

        {/* Tagline */}
        <p
          className="text-sm font-medium tracking-wide select-none text-center max-w-xs"
          style={{ color: `${accentColor}99` }}
        >
          {tagline}
        </p>

        {/* Spinner */}
        <div
          className="h-10 w-10 rounded-full border-4 border-transparent animate-spin"
          style={{
            borderTopColor: accentColor,
            borderRightColor: `${accentColor}55`,
          }}
          role="status"
          aria-label="Loading"
        />

        {/* Redirect notice */}
        <p
          className="text-xs select-none"
          style={{ color: `${accentColor}66` }}
        >
          Redirecting you to the store
          {countdown > 0 ? ` in ${countdown}…` : "…"}
        </p>

        {/* Manual fallback button */}
        <a
          href={storeUrl}
          className="mt-2 px-6 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 active:opacity-60"
          style={{ backgroundColor: accentColor, color: "#fff" }}
        >
          Open Store
        </a>
      </div>
    </>
  );
}
