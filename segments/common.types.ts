import type {LocationQueryRaw} from "vue-router";

export interface MenuLinksType {
    label: string,
    path?: string,
    type?: 'link' | 'megaMenu',
    subLinks?: { label: string, path: string }[]
}

export interface QueryParams {
    [key: string]: string | string[] | number | null
}

export interface PaginationInfo {
    currentPage: number
    itemsPerPage: any
    totalPages: number
}

export interface TypesenseQueryParam {
    q: string,
    per_page: number,
    page: number, query_by ?:string,
    filter_by: string
    sort_by?: string
}

export interface JobQueryParams extends LocationQueryRaw{
    mode: string
    keyword: string
    page: number
    location?: string
    coordinates?: number[]
    sort_by?: string
    employment_type?: string
    business_type_id?: string
    shift_type?: string
    job_role?: string
    experience_level?: string
    filter_by: string
}

export interface Coordinates {
    lng: number,
    lat: number
}

export interface JobSearchFilters{
    keyword: string
    coordinates: Coordinates
    location: string
}
