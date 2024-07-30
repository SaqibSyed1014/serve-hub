interface School {
  city: string;
  country: string;
  county_name: string;
  date_created: string;
  date_last_modified: string;
  geo_location?: [number, number];
  id: string;
  name: string;
  organization_description: string
  slug: string;
  state_code: string;
  street_address: string;
  type: string;
  website_url: string;
  zip_code: string;
  logo_path?: string
  geo_lat?: number
  geo_lng?: number
}

interface SchoolHit {
  document: School;
  highlight: Record<string, any>;
  highlights: any[];
}

interface SchoolResponseType {
  facet_counts: any[];
  found: number;
  hits: SchoolHit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
}
