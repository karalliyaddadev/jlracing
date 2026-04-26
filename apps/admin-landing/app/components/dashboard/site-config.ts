export type SiteKey = "local" | "international";

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
}

export interface ActionCard {
  label: string;
  href: string;
}

export interface SiteConfig {
  key: SiteKey;
  label: string;
  pageTitle: string;
  tokenKey: string;
  adminKey: string;
  nav: NavGroup[];
  stats: StatCard[];
  actions: ActionCard[];
}

const LOCAL_CONFIG: SiteConfig = {
  key: "local",
  label: "Local CMS",
  pageTitle: "Local CMS — JL Racing",
  tokenKey: "local_cms_token",
  adminKey: "local_cms_admin",
  nav: [
    {
      group: "Overview",
      items: [{ href: "/local/dashboard", label: "Dashboard", icon: "grid" }],
    },
    {
      group: "Content",
      items: [
        {
          href: "/local/dashboard/hero-banner",
          label: "Hero Banner",
          icon: "image",
        },
        { href: "/local/dashboard/video", label: "Video", icon: "play" },
      ],
    },
    {
      group: "Media & Blog",
      items: [
        { href: "/local/dashboard/blog", label: "Blog Posts", icon: "pen" },
        { href: "/local/dashboard/gallery", label: "Gallery", icon: "gallery" },
        { href: "/local/dashboard/faq", label: "FAQ", icon: "help" },
      ],
    },
    {
      group: "Subscribers",
      items: [
        {
          href: "/local/dashboard/newsletter",
          label: "Newsletter",
          icon: "mail",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          href: "/local/dashboard/settings",
          label: "Site Settings",
          icon: "settings",
        },
      ],
    },
  ],
  stats: [
    { label: "Hero Banners", value: "—", icon: "image" },
    { label: "Bike Listings", value: "—", icon: "bike" },
    { label: "Blog Posts", value: "—", icon: "pen" },
    { label: "Gallery Items", value: "—", icon: "gallery" },
  ],
  actions: [
    { label: "Edit Hero Banner", href: "/local/dashboard/hero-banner" },
    { label: "Add Blog Post", href: "/local/dashboard/blog" },
    { label: "Manage Bikes", href: "/local/dashboard/bikes" },
    { label: "Upload to Gallery", href: "/local/dashboard/gallery" },
    { label: "Manage Spare Parts", href: "/local/dashboard/spare-parts" },
    { label: "Pre Orders", href: "/local/dashboard/pre-orders" },
    { label: "Manage FAQs", href: "/local/dashboard/faq" },
  ],
};

const INTERNATIONAL_CONFIG: SiteConfig = {
  key: "international",
  label: "International CMS",
  pageTitle: "International CMS — JL Racing",
  tokenKey: "intl_cms_token",
  adminKey: "intl_cms_admin",
  nav: [
    {
      group: "Overview",
      items: [
        { href: "/international/dashboard", label: "Dashboard", icon: "grid" },
      ],
    },
    {
      group: "Content",
      items: [
        {
          href: "/international/dashboard/hero-banner",
          label: "Hero Banner",
          icon: "image",
        },
        {
          href: "/international/dashboard/video",
          label: "Video Banner",
          icon: "play",
        },
      ],
    },
    {
      group: "Media",
      items: [
        {
          href: "/international/dashboard/gallery",
          label: "Gallery",
          icon: "gallery",
        },
        {
          href: "/international/dashboard/faq",
          label: "FAQ",
          icon: "help",
        },
      ],
    },
    {
      group: "Subscribers",
      items: [
        {
          href: "/international/dashboard/newsletter",
          label: "Newsletter",
          icon: "mail",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          href: "/international/dashboard/settings",
          label: "Site Settings",
          icon: "settings",
        },
      ],
    },
  ],
  stats: [
    { label: "Hero Banners", value: "—", icon: "image" },
    { label: "Downloadable PDFs", value: "—", icon: "file" },
    { label: "Bike Inventory", value: "—", icon: "bike" },
    { label: "Spare Parts", value: "—", icon: "cog" },
    { label: "Gallery Items", value: "—", icon: "gallery" },
  ],
  actions: [
    { label: "Edit Hero Banner", href: "/international/dashboard/hero-banner" },
    { label: "Manage PDFs", href: "/international/dashboard/pdf" },
    { label: "Edit Video", href: "/international/dashboard/video" },
    { label: "Manage Bikes", href: "/international/dashboard/bikes" },
    {
      label: "Manage Spare Parts",
      href: "/international/dashboard/spare-parts",
    },
    { label: "Upload to Gallery", href: "/international/dashboard/gallery" },
    { label: "Manage FAQs", href: "/international/dashboard/faq" },
  ],
};

const SITE_CONFIGS: Record<SiteKey, SiteConfig> = {
  local: LOCAL_CONFIG,
  international: INTERNATIONAL_CONFIG,
};

export function getSiteConfig(site: SiteKey): SiteConfig {
  return SITE_CONFIGS[site];
}
