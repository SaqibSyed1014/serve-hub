export const employmentOptions = [
    { label: 'Full-time', value: 1 },
    { label: 'Part-time', value: 2 },
    { label: 'Contractor', value: 3 },
    { label: 'Intern', value: 4 },
    { label: 'Volunteer', value: 5 },
]

export const jobRolesOptions = [
    { label: "Instructional", value: 1 },
    { label: "Non-instructional", value: 2 }
]

export const compensationTypesOptions = [
    { label: "Salary", value: 1 },
    { label: "Hourly", value: 2 }
]

export const applyMethodOptions = [
    { label: "By Apply URL", value: "URL" },
    { label: "Email", value: "Email" },
]

export const salaryRange = [
    { label: "$20,000", value: 1 },
    { label: "$25,000", value: 2 },
    { label: "$30,000", value: 3 },
    { label: "$35,000", value: 4 },
    { label: "$40,000", value: 5 },
    { label: "$45,000", value: 6 },
    { label: "$50,000", value: 7 },
    { label: "$55,000", value: 8 },
    { label: "$60,000", value: 9 },
    { label: "$65,000", value: 10 },
    { label: "$70,000", value: 11 },
    { label: "$75,000", value: 12 },
    { label: "$80,000", value: 13 },
    { label: "$85,000", value: 14 },
    { label: "$90,000", value: 15 },
    { label: "$95,000", value: 16 },
    { label: "$100,000", value: 17 },
    { label: "$105,000", value: 18 },
    { label: "$110,000", value: 19 },
    { label: "$115,000", value: 20 },
    { label: "$120,000", value: 21 },
    { label: "$125,000", value: 22 },
    { label: "$130,000", value: 23 },
    { label: "$135,000", value: 24 },
    { label: "$140,000", value: 25 },
    { label: "$145,000", value: 26 },
    { label: "$150,000", value: 27 },
    { label: "$155,000", value: 28 },
    { label: "$160,000", value: 29 },
    { label: "$165,000", value: 30 },
    { label: "$170,000", value: 31 },
    { label: "$175,000", value: 32 },
    { label: "$180,000", value: 33 },
    { label: "$185,000", value: 34 },
    { label: "$190,000", value: 35 },
    { label: "$195,000", value: 36 },
    { label: "$200,000", value: 37 }
]

export const hourlyRange = [
    { label: "$10", value: 1 },
    { label: "$15", value: 2 },
    { label: "$20", value: 3 },
    { label: "$25", value: 4 },
    { label: "$30", value: 5 },
    { label: "$35", value: 6 },
    { label: "$40", value: 7 },
    { label: "$45", value: 8 },
    { label: "$50", value: 9 },
    { label: "$55", value: 10 },
    { label: "$60", value: 11 },
    { label: "$65", value: 12 },
    { label: "$70", value: 13 },
    { label: "$75", value: 14 },
    { label: "$80", value: 15 },
    { label: "$85", value: 16 },
    { label: "$90", value: 17 },
    { label: "$95", value: 18 },
    { label: "$100", value: 19 },
    { label: "$105", value: 20 },
    { label: "$110", value: 21 },
    { label: "$115", value: 22 },
    { label: "$120", value: 23 },
    { label: "$125", value: 24 },
    { label: "$130", value: 25 },
    { label: "$135", value: 26 },
    { label: "$140", value: 27 },
    { label: "$145", value: 28 },
    { label: "$150", value: 29 }
]

export const formStepsOptions = [
    { name: "Organization Information", href: "/post-a-job", status: "current" },
    { name: "Job Details", href: "/post-a-job/job-details", status: "upcoming" },
    {
        name: "Application Details",
        href: "/post-a-job/application-details",
        status: "upcoming",
    },
    {
        name: "Review Information",
        href: "/post-a-job/review-information",
        status: "upcoming",
    },
]

export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
];

export const formStepsHeaderContent = [
    {
        title: 'Organization Information',
        text: 'Please fill the fields below regarding institution information.'
    },
    {
        title: 'Job Details',
        text: 'Please fill the fields below regarding job information.'
    },
    {
        title: 'Application Details',
        text: 'Please fill the fields below regarding application details.'
    },
    {
        title: 'Review Information',
        text: 'Please review your application before submitting.'
    }
]
