export const businessFilters :JobFilter[] = [
    {
        fieldName: 'job_count',
        type: 'checkbox',
        title: 'No of Jobs',
        icon: 'SvgoBriefCase',
        list: [
            {
                label: '1 to 10',
                value: '1..10',
                checked: false,
                counts: 0
            },
            {
                label: '11 to 50',
                value: '11..50',
                checked: false,
                counts: 0
            },
            {
                label: '51 to 100',
                value: '51..100',
                checked: false,
                counts: 0
            },
            {
                label: '100+',
                value: '>100',
                checked: false,
                counts: 0
            }
        ]
    },
]

export function getBusinessFilterQuery(alphabetFilter :string, cbFilters :string) {
    let result :string[] = [];
    result.push('status:=active');
    if (alphabetFilter.length) result.push(alphabetFilter);
    if (cbFilters.length) result.push(cbFilters)
    return result.join('&&');
}
