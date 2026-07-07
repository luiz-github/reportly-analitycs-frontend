import connectMetaAds from "@/services/integration/connectMetaAds";

export const CONNECT_HANDLES = {
    meta_ads: connectMetaAds,
} as const;

export const INTEGRATIONS = [
    {
        key: "meta_ads",
        name: "Meta Ads",
        platform: "META_ADS",
        description: "Facebook and Instagram ad accounts",
        permissionsLabel: "ads_read",
    },
] as const;