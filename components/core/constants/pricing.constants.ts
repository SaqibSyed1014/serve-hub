import ChatsIcon from "assets/icons/chats.svg";
import FlashIcon from "assets/icons/flash.svg";
import ReportIcon from "assets/icons/report.svg";
import HappyFaceIcon from "assets/icons/happy-face.svg";
import ToolIcon from "assets/icons/tool.svg";
import PositiveFeedbackIcon from "assets/icons/positive-feedback.svg";

export const faqs = [
    {
        question: 'How long will my job posting remain active?',
        answer: 'Standard job postings remain active for 30 days. Featured job postings have extended visibility for up to 45 days'
    },
    {
        question: 'Are there any hidden fees for posting jobs?',
        answer: 'No, there are no hidden charges. All fees are clearly outlined in our pricing section.'
    },
    {
        question: 'What is your cancellation policy?',
        answer: 'The only subscription plan is our unlimited plan.  You can cancel this plan by providing 30 days written notice.'
    },
    {
        question: 'Do you offer discounts for annual subscriptions?',
        answer: 'Yes, we offer discounts for annual subscriptions, providing better value for businesses looking for long-term engagement.'
    },
    {
        question: 'How does the pricing for featured job postings work?',
        answer: 'Featured job postings, priced at $79 each, appear at the top of search results and receive priority placement for increased visibility and exposure to potential candidates.'
    },
    {
        question: 'Is there a free trial available?',
        answer: 'For new customers, we offer a free one-time 45-day trial with unlimited job postings. During this time, we help partner with you to understand your hiring needs.'
    },
]

export const features = [
    {
        icon: ChatsIcon,
        title: 'Modern and Easy-to-Use Interface',
        description: 'Our user-friendly design ensures a seamless experience for both employers and job seekers, making it easy to post jobs and find the right candidates.'
    },
    {
        icon: FlashIcon,
        title: 'Dedicated to the Hospitality Industry',
        description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'
    },
    {
        icon: ReportIcon,
        title: 'Unlimited Users',
        description: 'Invite your entire team to collaborate on the hiring process without any additional cost, ensuring a comprehensive and efficient recruitment strategy.'
    },
    {
        icon: HappyFaceIcon,
        title: 'Partner With Us',
        description: 'We believe in building strong partnerships with businesses. Our dedicated support team is here to help you every step of the way, ensuring your success.'
    },
    {
        icon: ToolIcon,
        title: 'Multi-Channel Job Posting',
        description: 'Effortlessly post jobs to our platform via email, Facebook Messenger, live chat, phone, or SMS, offering you flexible and convenient ways to list your openings without logging in'
    },
    {
        icon: PositiveFeedbackIcon,
        title: 'Reach More Candidates',
        description: 'Amplify your job postings across our extensive network of hospitality professionals, ensuring maximum visibility and attracting top-tier talent to your opportunities.'
    }
]

let pricingPlanIDsList :string[] = [];
if (process.env.NODE_ENV === 'production') {
    pricingPlanIDsList = [
        'price_1PjUnOLckED7yHH5KCrFFVNJ',
        'price_1PjV5hLckED7yHH5pfPGMjo1',
        'price_1PjV7zLckED7yHH5TqoZqROF',
        'price_1PjV7zLckED7yHH59btqm7qb',
        'price_1PjV7zLckED7yHH5ii4KzzIz',
        'price_1PjV7zLckED7yHH5QxkjxGWf'
    ]
}

const { host } = useRequestURL();


if (process.env.NODE_ENV === 'development' || host?.includes('localhost') || host?.includes('netlify') || host?.includes('devweb')) {
    console.log('using dev price Ids ', process.env.NODE_ENV, host)
    pricingPlanIDsList = [
        'price_1OMd9PLckED7yHH5UC3XcJjA',
        'price_1PjUuaLckED7yHH5Nto134vZ',
        'price_1PjUzfLckED7yHH5oLVxbDHh',
        'price_1PjUzfLckED7yHH5AHyUL7a3',
        'price_1PjUzfLckED7yHH5Xz9CtVjI',
        'price_1PjUzfLckED7yHH5CEZWTO4g'
    ]
}

export const pricingPlansIDs = pricingPlanIDsList

export const pricingPlans = [
    {
        id: 1,
        title: 'Standard Job Posting',
        priceText: '$49',
        slotStartRange: 1,
        slotEndRange: 25,
        showSlotOptions: false,
        benefits: [
            'Visible for 30 Days',
            'Broad Exposure',
            'Easy Application Process',
            'Performance Tracking',
            'Basic chat and email support'
        ],
        showBuyBtn: true,
        showContactSalesBtn: false,
        priceId: pricingPlansIDs[0]
    },
    {
        id: 2,
        title: 'Featured Job Posting',
        priceText: '$79',
        slotStartRange: 1,
        slotEndRange: 25,
        showSlotOptions: false,
        benefits: [
            'Visible for 45 Days',
            'Highlighted Listing',
            'Increased Exposure',
            'Social Media Promotion',
            'Priority chat and email support'
        ],
        showBuyBtn: true,
        showContactSalesBtn: false,
        priceId: pricingPlansIDs[1]
    },
    {
        id: 3,
        title: 'Job Slots',
        priceText: '',
        showSlotOptions: true,
        slotsPricing: [
            { totalSlots: 10, price: '$440', saving: '$50', priceId: pricingPlansIDs[2] },
            { totalSlots: 15, price: '$615', saving: '$120', priceId: pricingPlansIDs[3] },
            { totalSlots: 20, price: '$780', saving: '$200', priceId: pricingPlansIDs[4] },
            { totalSlots: 25, price: '$925', saving: '$300', priceId: pricingPlansIDs[5] }
        ],
        benefits: [
            'Flexible Posting',
            'Cost-Effective',
            'Unlimited Replacements',
            'Enhanced Visibility',
            'Dedicated Account Manager'
        ],
        showBuyBtn: true,
        showContactSalesBtn: false
    },
    {
        id: 4,
        title: 'Unlimited Jobs Posting',
        priceText: 'Starting at $499/mo',
        showSlotOptions: false,
        benefits: [
            'Quarterly Subscription',
            'Each Job Visible for 45 days',
            'Post Unlimited Jobs',
            'Premium Support',
            'Performance Tracking',
            'Dedicated Account Manager'
        ],
        showBuyBtn: false,
        showContactSalesBtn: true
    }
]
