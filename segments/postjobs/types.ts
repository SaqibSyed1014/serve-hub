 interface StripeCheckoutSession {
    id: string;
    object: string;
    after_expiration: any | null;
    allow_promotion_codes: any | null;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: AutomaticTax;
    billing_address_collection: any | null;
    cancel_url: string;
    client_reference_id: any | null;
    client_secret: any | null;
    consent: any | null;
    consent_collection: any | null;
    created: string;
    currency: string;
    currency_conversion: any | null;
    custom_fields: any[];
    custom_text: CustomText;
    customer: string;
    customer_creation: any | null;
    customer_details: CustomerDetails;
    customer_email: any | null;
    expires_at: string;
    invoice: any | null;
    invoice_creation: InvoiceCreation;
    livemode: boolean;
    locale: any | null;
    metadata: Metadata;
    mode: string;
    payment_intent: any | null;
    payment_link: any | null;
    payment_method_collection: string;
    payment_method_configuration_details: any | null;
    payment_method_options: PaymentMethodOptions;
    payment_method_types: string[];
    payment_status: string;
    phone_number_collection: PhoneNumberCollection;
    recovered_from: any | null;
    saved_payment_method_options: SavedPaymentMethodOptions;
    setup_intent: any | null;
    shipping_address_collection: any | null;
    shipping_cost: any | null;
    shipping_details: any | null;
    shipping_options: any[];
    status: string;
    submit_type: any | null;
    subscription: any | null;
    success_url: string;
    total_details: TotalDetails;
    ui_mode: string;
    url: string;
}

 interface AutomaticTax {
    enabled: boolean;
    liability: any | null;
    status: any | null;
}

 interface CustomText {
    after_submit: any | null;
    shipping_address: any | null;
    submit: any | null;
    terms_of_service_acceptance: any | null;
}

 interface CustomerDetails {
    address: any | null;
    email: string;
    name: any | null;
    phone: any | null;
    tax_exempt: string;
    tax_ids: any | null;
}

 interface InvoiceCreation {
    enabled: boolean;
    invoice_data: InvoiceData;
}

 interface InvoiceData {
    account_tax_ids: any | null;
    custom_fields: any | null;
    description: any | null;
    footer: any | null;
    issuer: any | null;
    metadata: Record<string, any>;
    rendering_options: any | null;
}

 interface Metadata {
    fullname: string;
}

 interface PaymentMethodOptions {
    card: Card;
}

 interface Card {
    request_three_d_secure: string;
}

 interface PhoneNumberCollection {
    enabled: boolean;
}

 interface SavedPaymentMethodOptions {
    allow_redisplay_filters: string[];
    payment_method_save: any | null;
}

 interface TotalDetails {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
}

 interface StripeResponse {
    content: StripeCheckoutSession;
    duration: number;
    status: string;
    requestId: string;
}

 interface JobPaymentPayload {
     email: string;
     price_id: string;
     fullName: string;
     businessName: string;
     businessTypeId: number;
     jobTitle: string;
 }

 interface BusinessType {
     business_type_id: number;
     business_type: string;
     business_type_slug: string;
     show_primary_nav: number;
     sort_order: number;
 }

interface GradeLevel {
    grade_level_id: number;
    grade_level_long: string;
    grade_level: string;
    grade_level_int: number;
    sort_order: number;
}

interface Subject {
    subject_id: number;
    subject_long: string;
    subject: string;
    sort_order: number;
}

 interface ExperienceLevel {
     experience_level_id: number;
     experience_level: string;
     experience_level_description: string;
     sort_order: number;
     active: number;
 }


 interface OrgResponseType {
     facet_counts: any[];
     found: number;
     hits: OrgHit[];
     out_of: number;
     page: number;
     request_params: RequestParams;
     search_cutoff: boolean;
     search_time_ms: number;
 }

 interface JobSaveResponseType {
    data: {
        email: string;
        job_id: number;
        job_slug: string;
    }
     message: string;
 }

 interface CheckUserMailResponseType {
     data: {
         message: string;
     }
     error: boolean;
 }

 interface OrgHit {
     document: OrgDocument;
     highlight: Record<string, any>;
     highlights: any[];
 }

 interface OrgDocument {
     name: string;
     city: string;
     county_name: string;
     id: string;
     institution_level: number;
     institution_name: string;
     latitude: number;
     location:  [number, number];
     longitude: number;
     mission_statement: string;
     mission_statement_url: string;
     ope_id_number: number;
     phone_number: string;
     size_category: number;
     state_abbr: string;
     street_address: string;
     website_url: string;
     zip_code: string;
 }

