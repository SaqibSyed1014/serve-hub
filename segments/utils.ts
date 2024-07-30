import type { Router } from "vue-router";

export const usePayloadUrl = () => {
    const config = useRuntimeConfig()
    let baseUrl, apiKey, strapiBaseUrl, strapiApiToken
    baseUrl = config.public.API_URL
    apiKey = config.public.API_KEY
    strapiBaseUrl = config.public.STRAPI_API_URL
    strapiApiToken = config.public.STRAPI_API_TOKEN
    return { baseUrl, apiKey, strapiBaseUrl ,strapiApiToken }
}


export function convertQueryToString(query: { [key: string]: any }): string {
    return Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
}

export function convertDateFormat(date: Date | string) {
    if (typeof date === 'string') {   // converting yyyy-dd-mm to mm/dd/yyyy format
        const parts = date.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
}

export function convertTZDateToShortDate(givenDate :Date | string) {
    const date = new Date(givenDate);
    return (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear();
}

export function getDaysDifference(givenDateString :Date | string) :string {
    const givenDate :any = new Date(givenDateString);
    const currentDate :any = new Date();
    const daysDifference :number = Math.floor((currentDate - givenDate) / (1000 * 60 * 60 * 24));
    if (daysDifference === 1) return 'Yesterday';
    else if (daysDifference === 0) return 'Today'
    else return `${daysDifference}d ago`;
}


export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number = 500
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function(this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;

        if (timeout) {
            clearTimeout(timeout); // Clear previous timeout if it exists
        }
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

export function reloadActiveRouteOnClick(path :string, router: Router) {
    if (router.currentRoute.value.path === path) reloadNuxtApp();
}
