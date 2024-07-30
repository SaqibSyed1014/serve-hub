interface CollegeDocument {
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
  organization_description: string
  phone_number: string;
  size_category: number;
  state_abbr: string;
  street_address: string;
  website_url: string;
  zip_code: string;
}

interface Hit {
  document: CollegeDocument;
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


interface CollegesResponseType {
  facet_counts: any[];
  found: number;
  hits: Hit[];
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
