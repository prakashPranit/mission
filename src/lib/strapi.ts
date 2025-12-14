const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export interface Article {
    id: number;
    attributes: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        readTime: string;
        cover: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        categories: {
            data: Array<{
                id: number;
                attributes: {
                    name: string;
                    slug: string;
                };
            }>;
        };
    };
}

export interface Category {
    id: number;
    attributes: {
        name: string;
        slug: string;
    };
}

/**
 * Helper to get full Strapi URL
 */
export function getStrapiURL(path = "") {
    return `${STRAPI_URL}${path}`;
}

/**
 * Helper to get media URL
 */
export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }
    return `${STRAPI_URL}${url}`;
}

/**
 * Fetch API wrapper
 */
async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    // Build request URL
    const queryString = Object.entries(urlParamsObject)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
}

/**
 * Get all articles with population
 */
export async function getArticles() {
    const articles = await fetchAPI("/articles", {
        populate: ["cover", "categories"],
        sort: ["publishedAt:desc"],
    });
    return articles.data;
}

/**
 * Get single article by slug
 */
export async function getArticleBySlug(slug: string) {
    const articles = await fetchAPI("/articles", {
        "filters[slug][$eq]": slug,
        populate: ["cover", "categories"],
    });
    return articles.data[0];
}

/**
 * Get all categories
 */
export async function getCategories() {
    const categories = await fetchAPI("/categories");
    return categories.data;
}
