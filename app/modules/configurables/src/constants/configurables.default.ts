/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  webviewUrl: string;
  loadingBackgroundColor?: string;
  loadingSpinnerColor?: string;
  tagline?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "ShopCart BD",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#E63946",
    secondary: "#333333",
    accent: "#E63946",
  },
  webviewUrl: "https://shopcartbd.vercel.app/",
  loadingBackgroundColor: "#FFFFFF",
  loadingSpinnerColor: "#E63946",
  tagline: "Your Shopping Destination",
};
