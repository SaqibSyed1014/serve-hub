interface PartnerLogo {
    display_order: number
    is_active: number
    logo_id: number
    logo_path: string
}

interface JobsInCities {
    job_city: string;
    job_state: string;
    job_count: number;
    company_count: number;
    lat: number;
    lng: number;
    photo_url: string;
    priority_rank: number;
}

interface FeaturedBusinesses {
    id: number
    name: number
    slug: string
    business_type: string
    logo_path: string
    number_jobs: string
}

interface Org {
    banner_path: string;
    charter: string;
    city: string;
    country: string;
    county_name: string;
    domain: string;
    geo_lat: number;
    geo_lng: number;
    id: number;
    job_count: number;
    logo_path: string;
    name: string;
    organization_description: string;
    reference_id: number;
    school_count: number;
    slug: string;
    state_code: string;
    state_name: string;
    street_address: string;
    student_count: number;
    teacher_count: number;
    type: string;
    website_url: string;
    zip_code: string;
}

interface BusinessType {
    business_type_id: number;
    business_type: string;
    business_type_slug: string;
    show_primary_nav: number;
    sort_order: number;
}

interface EmploymentType {
    active: number;
    employment_type: string;
    employment_type_id: number;
    sort_order: number;
}
interface ShiftType {
    active: number;
    shift_type: string;
    shift_type_id: number;
    sort_order: number;
}

interface ContactFormPayload {
    fullName: string;
    email: string;
    message: string;
    phoneNumber: string;
    privacyConsent: boolean;
}
