// getPageContent.ts
// Utility to fetch CSV-driven page content by slug

import landingPages from "@/data/landing_pages.json";

export interface PageContent {
    slug: string;
    block_1_content?: string;
    block_2_content?: string;
    block_1_placement?: string;
    block_2_placement?: string;
    cta_primary_text?: string;
    cta_secondary_text?: string;
    faq?: Array<{ question: string; answer: string }>;
    faq_theme?: string;
    faq_unique_q_count?: number;
    // Preserve other fields
    h1?: string;
    intro_text?: string;
    title?: string;
    meta_description?: string;
    features?: string[];
    images?: string[];
    template?: string;
    product_id?: string;
}

/**
 * Get page content from landing_pages.json by slug
 * @param slug - The page slug (e.g., "", "pergola-systeme", "kontakt")
 * @returns PageContent or null if not found
 */
export function getPageContent(slug: string): PageContent | null {
    // Normalize slug: remove leading/trailing slashes
    const normalizedSlug = slug.replace(/^\/|\/$/g, "");

    const page = landingPages.find((p: any) => p.slug === normalizedSlug);

    if (!page) {
        return null;
    }

    return page as PageContent;
}

/**
 * Check if secondary CTA should be rendered
 * Rule: cta_secondary_text = "—" means DO NOT RENDER
 */
export function shouldRenderSecondaryCTA(cta_secondary_text?: string): boolean {
    if (!cta_secondary_text) return false;
    if (cta_secondary_text === "—") return false;
    return true;
}
