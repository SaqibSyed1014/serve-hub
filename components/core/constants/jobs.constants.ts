export const jobFilters :JobFilter[] = [
    {
        fieldName: 'job_role',
        type: 'checkbox',
        title: 'Role Type',
        icon: 'SvgoBarChart',
        list: [
            {
                label: 'Bartender',
                value: 'Bartender',
                checked: false,
                counts: 0
            },
            {
                label: 'Barback',
                value: 'Barback',
                checked: false,
                counts: 0
            },
            {
                label: 'Cook',
                value: 'Cook',
                checked: false,
                counts: 0
            },
            {
                label: 'Chef',
                value: 'Chef',
                checked: false,
                counts: 0
            },
            {
                label: 'Waiter',
                value: 'Waiter',
                checked: false,
                counts: 0
            },
            {
                label: 'Host',
                value: 'Host',
                checked: false,
                counts: 0
            },
            {
                label: 'Dishwasher',
                value: 'Dishwasher',
                checked: false,
                counts: 0
            },
            {
                label: 'Server',
                value: 'Server',
                checked: false,
                counts: 0
            },
            {
                label: 'Busser',
                value: 'Busser',
                checked: false,
                counts: 0
            },
            {
                label: 'Food Runner',
                value: 'Food Runner',
                checked: false,
                counts: 0
            },
            {
                label: 'Restaurant Manager',
                value: 'Restaurant Manager',
                checked: false,
                counts: 0
            },
        ]
    },
    {
        fieldName: 'experience_level',
        type: 'checkbox',
        title: 'Experience Level',
        icon: 'SvgoLineChartUp',
        list: [
            {
                label: 'Entry-level',
                value: 'Entry-level',
                checked: false,
                counts: 0,
                tooltipText: 'New graduates or first-year teachers'
            },
            {
                label: 'Early Career',
                value: 'Early Career',
                checked: false,
                counts: 0,
                tooltipText: '1-5 years of experience'
            },
            {
                label: 'Mid-level',
                value: 'Mid-Level',
                checked: false,
                counts: 0,
                tooltipText: '5-10 years of experience'
            },
            {
                label: 'Experienced',
                value: 'Experienced',
                checked: false,
                counts: 0,
                tooltipText: 'Over 10 years of experience'
            },
            {
                label: 'Leadership',
                value: 'Leadership',
                checked: false,
                counts: 0,
                tooltipText: 'Principals, vice-principals, or district-level administrators'
            }
        ],
    },
    {
        fieldName: 'salary_filter',
        type: 'range',
        title: 'Compensation',
        icon: 'SvgoCurrencyDollar',
        list: [],
        hasSwitcher: true,
        isSalaryRange: true,
        salary: {
            min: 20000,
            max: 200000
        },
        hourly: {
            min: 10,
            max: 100
        }
    }
]

export const itemsViewOptions = [
    {
        label: 'List',
        icon: 'SvgoList',
        isDisabled: false
    },
    {
        label: 'Grid',
        icon: 'SvgoGrid',
        isDisabled: false
    },
    {
        label: 'Map',
        icon: 'SvgoLocationMarker',
        isDisabled: true
    }
]

interface CompensationResult {
    min :number,
    max:number,
    type: string
}

export function extractMinMaxCompensationValues(compensationFilters :string) :CompensationResult  {
    const result :Partial<CompensationResult> = {};
    const conditions :string[] = compensationFilters.split('&&');
    conditions.forEach((condition :string) => {
        // @ts-ignore
        // const [, key, type, value] = condition.match(/(min|max)_(salary|hourly):[><=]+(\d+)/);
        // if (key === 'min') result.min = Number(value);
        // else if (key === 'max') result.max = Number(value);
        // result.type = type;
    });
    return result as CompensationResult;
}

export function extractSpecificFilterValues(filterString :string, filterName :'compensation' | 'checkboxes') {
    let extractedFilters :string = '';
    if (filterName === 'compensation') {
        extractedFilters = filterString.replace(/(min_(salary|hourly):>=\d+&&max_(salary|hourly):<=\d+&&)/, '');
    }
    return extractedFilters;
}

export function getFilterByQuery(compensationFilters :string, cbFilters :string, locationFilter :string) {
    let finalQuery = [];
    finalQuery.push(`date_posting_expires:>=${convertTodayInUnixTimeStamp()}`);
    if (compensationFilters.length) finalQuery.push(compensationFilters);
    if (cbFilters.length) finalQuery.push(cbFilters);
    if (locationFilter.length) finalQuery.push(locationFilter)
    return finalQuery.join('&&');
}

export function divideFilterQuery(filterString :string) : { type: string, min: number, max :number, isCompensationEmpty: boolean } {
    let splitFilters = filterString.split('&&')
    console.log('here ', splitFilters);

    let isSalary = false, minValue = 0, maxValue = 0, isCompensationEmpty = true;

    splitFilters.forEach(filter => {
        if (filter.includes('min_salary')) {
            isSalary = true;
            minValue = parseInt(filter.split('>=')[1], 10);
        } else if (filter.includes('min_hourly')) {
            isSalary = false;
            minValue = parseInt(filter.split('>=')[1], 10);
        } else if (filter.includes('max_salary')) {
            maxValue = parseInt(filter.split('<=')[1], 10);
        } else if (filter.includes('max_hourly')) {
            maxValue = parseInt(filter.split('<=')[1], 10);
        } else if (filter.includes('is_salary_empty')) {
            isCompensationEmpty = filter.split(':')[1] === 'true';
        } else if (filter.includes('is_hourly_empty')) {
            isCompensationEmpty = filter.split(':')[1] === 'true';
        }
    });

    return {
        type: isSalary ? 'salary' : 'hourly',
        min: minValue,
        max: maxValue,
        isCompensationEmpty: isCompensationEmpty,
    };
}

export function convertTodayInUnixTimeStamp() {
    const now = new Date();
    // Create a date object for today at midnight UTC
    const todayMidnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    // Get the Unix timestamp (in milliseconds) and divide by 1000 to convert to seconds
    return Math.floor(todayMidnightUTC.getTime() / 1000);
}

export function convertUnixTimestamp(timestamp :number) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
