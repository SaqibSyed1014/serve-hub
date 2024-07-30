interface DistrictDocument {
  active: number;
  city: string;
  country: string;
  country_code: string;
  county_name: string;
  district_description: string;
  district_display_name: string;
  district_name: string;
  facebook_page: string;
  geo_lat: number;
  geo_lng: number;
  id: string;
  instagram_handle: string;
  logo_path: string;
  nces_district_id: string;
  organization_description: string
  phone: string;
  school_count: number;
  state_code: string;
  state_name: string;
  street_address: string;
  student_count: number;
  teacher_count: number;
  twitter_handle: string;
  verified: number;
  website_url: string;
  zip_code: string;
  zip_code_ext: string;
  status: string;
}

interface DistrictHit {
  document: DistrictDocument;
  highlight: Record<string, any>;
  highlights: any[];
}

interface RequestParams {
  collection_name: string;
  first_q: string;
  per_page: number;
  q: string;
}

interface SearchResult {
  facet_counts: any[];
  found: number;
  hits: Hit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
}


interface DisrictResponseType {
  facet_counts: any[];
  found: number;
  hits: DistrictHit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
}


interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}
