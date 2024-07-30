<script setup lang="ts">
const props = defineProps<{ jobData: Job }>();

function convertDateFormat(dateString: string): string {
  const [monthName, day, year] = dateString.split(/,\s|\s/);
  const months: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const monthIndex = months[monthName];
  if (monthIndex === undefined) throw new Error(`Invalid month name: ${monthName}`);
  const date = new Date(Date.UTC(Number(year), monthIndex, Number(day)));
  const isoDate = date.toISOString();
  return isoDate.slice(0, 10);
}



const jsonLD = {
  "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": props.jobData.job_title,
    "description": props.jobData.job_description,
    "datePosted": convertDateFormat(props.jobData.date_posted),
    "validThrough": props.jobData.application_deadline?.length ? convertDateFormat(props.jobData.application_deadline) : null,
    "employmentType": props.jobData.employment_type || 'Full-time',
    "hiringOrganization": {
      "@type": "Organization",
      "name": props.jobData.organization_name,
      "sameAs": props.jobData.slug || null,
    },
  "jobLocation": {
    "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": props.jobData.job_street_address,
        "addressLocality": props.jobData.job_city,
        "addressRegion": props.jobData.job_state || null,
        "postalCode": props.jobData.job_postal_code || null,
        "addressCountry": 'US',
      }
  },
  "baseSalary": 15 ? {
    "@type": "MonetaryAmount",
    "currency": 'USD',
    "value": {
      "@type": "QuantitativeValue",
      "value": 200,
      "unitText": 'HOURLY',
    }
  } : null
}

useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify(jsonLD)
    }
  ],
})
</script>

