
interface Job {
    job_id: string
    date_created: string
    organization_name: string
    organization_id: string
    organization_slug: string
    organization_type?: string
    slug?: string
    date_posted: string
    date_posting_expires: string // unix timestamp
    start_date?: string
    job_title: string
    job_role: string
    job_slug: string
    grade_levels?: string[]
    subjects?: string[]
    job_description: string
    apply_url?: string
    apply_email?: string
    apply_method: string
    job_country: string
    job_city: string
    job_state: string
    job_location: string
    job_street_address?: string
    job_postal_code?: string
    job_logo?: string
    featured: string
    active: boolean
    employment_type_id?: string
    employment_type?: string
    geo_location?: number[]
    application_deadline?: string
    shift_type?: string
}

interface JobHit {
    document: Job;
    highlight: Record<string, any>;
    highlights: any[];
}

interface FacetCounts {
    counts: {
        count: number
        highlighted: string
        value: string
    }[]
    field_name: string
    sampled: boolean
}

interface JobResponseType {
    facet_counts: FacetCounts[];
    found: number;
    hits: JobHit[];
    out_of: number;
    page: number;
    request_params: RequestParams;
    search_cutoff: boolean;
    search_time_ms: number;

}

interface JobDetails extends Job {
    internal_job_code: string
    geo_lat: number
    geo_lng: number
    business_type: string
    banner_path?: string
    slug: string
    max_salary?: string
    min_salary?: string
    max_hourly?: string
    min_hourly?: string
}

interface JobFaq {
    question: string
    answer: string
}

interface JobBenefits {
    benefit_id: number
    benefit_name: string
    benefit_description: string
    icon_path: string
    display_order: number
}

interface ExtendedJobDetails {
    job_benefits: JobBenefits[]
    job_faqs: JobFaq[]
    job_details: JobDetails | null
}


interface JobFilter {
    fieldName: string
    type: string
    title: string
    icon: string
    list: {
        label: string
        value: string | number
        checked: boolean
        counts: number
        tooltipText?: string
    }[]
    hasSwitcher?: boolean
    isSalaryRange?: boolean
    salary?: {
        min: number
        max: number
    }
    hourly?: {
        min: number
        max: number
    }
}
