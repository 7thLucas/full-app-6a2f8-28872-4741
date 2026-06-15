import { useEffect, useRef, useState } from "react";
import { useConfigurables } from "~/modules/configurables";

/**
 * LoadingScreen — shown while the webview (iframe) is loading.
 * Fades out smoothly once the content is ready.
 */
function LoadingScreen({
  appName,
  tagline,
  logoUrl,
  bgColor,
  spinnerColor,
  visible,
}: {
  appName: string;
  tagline?: string;
  logoUrl?: string;
  bgColor: string;
  spinnerColor: string;
  visible: boolean;
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
      style={{
        backgroundColor: bgColor,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      {/* Logo */}
      {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" && (
        <img
          src={logoUrl}
          alt={appName}
          className="h-16 w-auto object-contain"
          draggable={false}
        />
      )}

      {/* App name */}
      {(!logoUrl || logoUrl === "FILL_LOGO_URL_HERE") && (
        <span
          className="text-2xl font-bold tracking-tight select-none"
          style={{ color: spinnerColor }}
        >
          {appName}
        </span>
      )}

      {/* Spinner */}
      <div
        className="h-10 w-10 rounded-full border-4 border-transparent animate-spin"
        style={{
          borderTopColor: spinnerColor,
          borderRightColor: `${spinnerColor}55`,
        }}
        role="status"
        aria-label="Loading"
      />

      {/* Tagline */}
      {tagline && (
        <p
          className="text-sm font-medium tracking-wide select-none"
          style={{ color: `${spinnerColor}99` }}
        >
          {tagline}
        </p>
      )}
    </div>
  );
}

/**
 * WebviewFrame — the full-screen iframe.
 * Fires onLoad when the target page finishes loading.
 */
function WebviewFrame({
  url,
  onLoad,
  title,
}: {
  url: string;
  onLoad: () => void;
  title: string;
}) {
  return (
    <iframe
      src={url}
      title={title}
      onLoad={onLoad}
      className="absolute inset-0 h-full w-full border-none"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; payment"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export default function IndexPage() {
  const { config, loading } = useConfigurables();

  const [webviewLoaded, setWebviewLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Once the iframe fires onLoad, start the fade-out transition
  function handleWebviewLoad() {
    setWebviewLoaded(true);
    // Give the CSS opacity transition time to complete before unmounting loading screen
    hideTimerRef.current = setTimeout(() => setShowLoading(false), 550);
  }

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // While configurables are still fetching, show a bare white screen
  if (loading) {
    return <div className="fixed inset-0 bg-white" />;
  }

  const appName = config?.appName || "ShopCart BD";
  const webviewUrl = config?.webviewUrl || "https://shopcartbd.vercel.app/";
  const logoUrl = config?.logoUrl;
  const tagline = config?.tagline;
  const bgColor = config?.loadingBackgroundColor || "#FFFFFF";
  const spinnerColor = config?.loadingSpinnerColor || "#E63946";

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Webview iframe — always mounted so it starts loading immediately */}
      <WebviewFrame
        url={webviewUrl}
        title={appName}
        onLoad={handleWebviewLoad}
      />

      {/* Loading overlay — fades out after the iframe loads */}
      {showLoading && (
        <LoadingScreen
          appName={appName}
          tagline={tagline}
          logoUrl={logoUrl}
          bgColor={bgColor}
          spinnerColor={spinnerColor}
          visible={!webviewLoaded}
        />
      )}
    </div>
  );
}
