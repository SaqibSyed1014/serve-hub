import ChatsIcon from "assets/icons/chats.svg";
import FlashIcon from "assets/icons/flash.svg";
import ReportIcon from "assets/icons/report.svg";
import HappyFaceIcon from "assets/icons/happy-face.svg";
import ToolIcon from "assets/icons/tool.svg";
import PositiveFeedbackIcon from "assets/icons/positive-feedback.svg";

export const faqs = [
    {
        question: 'Is there a free trial available?',
        answer: 'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
        question: 'Can I change my plan later?',
        answer: 'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.'
    },
    {
        question: 'What is your cancellation policy?',
        answer: 'We understand that things change. You can cancel your plan at any time and we\'ll refund you the difference already paid.'
    },
    {
        question: 'Can other info be added to an invoice?',
        answer: 'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
    },
    {
        question: 'How does billing work?',
        answer: 'Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.'
    },
    {
        question: 'How do I change my account email?',
        answer: 'You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.'
    },
]

export const features = [
    {
        icon: ChatsIcon,
        title: 'Share team inboxes',
        description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.'
    },
    {
        icon: FlashIcon,
        title: 'Deliver instant answers',
        description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'
    },
    {
        icon: ReportIcon,
        title: 'Manage your team with reports',
        description: 'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.'
    },
    {
        icon: HappyFaceIcon,
        title: 'Connect with customers',
        description: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.'
    },
    {
        icon: ToolIcon,
        title: 'Connect the tools you already use',
        description: 'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.'
    },
    {
        icon: PositiveFeedbackIcon,
        title: 'Our people make the difference',
        description: 'We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.'
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
} else if (process.env.NODE_ENV === 'development') {
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
            'Access to all basic features',
            'Basic reporting and analytics',
            'Up to 10 individual users',
            '20GB individual data each user',
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
            '200+ integrations',
            'Advanced reporting and analytics',
            'Up to 20 individual users',
            '40GB individual data each user',
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
            'Advanced custom fields',
            'Audit log and data history',
            'Unlimited individual users',
            'Unlimited individual data',
            'Personalised chat and email support'
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
            'Advanced custom fields',
            'Audit log and data history',
            'Unlimited individual users',
            'Unlimited individual data',
            'Personalised chat and email support'
        ],
        showBuyBtn: false,
        showContactSalesBtn: true
    }
]
