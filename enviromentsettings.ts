export interface GlobalSettings {
    SITE_ENVIRONMENT: string;
    API_URL: string;
    API_KEY: string;
    STRAPI_API_URL: string;
    STRAPI_API_TOKEN: string;
}

export interface GlobalSettingsMap {
    development: GlobalSettings;
    staging: GlobalSettings;
    production: GlobalSettings;
}

export const globalSettings: GlobalSettingsMap = {
    development: {
        SITE_ENVIRONMENT: 'development',
        API_URL: 'https://api.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOKEN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    },
    staging: {
        SITE_ENVIRONMENT: 'staging',
        API_URL: 'https://api.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOKEN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    },
    production: {
        SITE_ENVIRONMENT: '',
        API_URL: 'https://api.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOKEN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    }
};

