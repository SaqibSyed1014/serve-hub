export interface GlobalSettings {
    SITE_ENVIRONMENT: string;
    API_URL: string;
    API_KEY: string;
    STRAPI_API_URL: string;
    STRAPI_API_TOKEN: string;
}

export type EnvType = 'development' | 'staging' | 'production';

type GlobalSettingsMap = {
    [key in EnvType]: GlobalSettings;
};

export const globalSettings: GlobalSettingsMap = {
    development: {
        SITE_ENVIRONMENT: 'deveopment',
        API_URL: 'https://devapi.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.servehub.io',
        STRAPI_API_TOKEN : '732b2af58cbc5ab8280e8cb7ea96b15712071315816b1b85e69aa42d4e425e29d3629f59f642d1686b13236e3134eb58cd7c84ea8b10720768bfa90420f82c99e6d7fe2ef03d287f958664c701f36c96d6f94a381325eb56af209a04668ef1c1b8bc39d5d6600fff3cfbc061b6c5a9d89761f618ac8eabe3cbb0e8b77be2f0fb'
    },
    staging: {
        SITE_ENVIRONMENT: 'staging',
        API_URL: 'https://devapi.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.servehub.io',
        STRAPI_API_TOKEN : '732b2af58cbc5ab8280e8cb7ea96b15712071315816b1b85e69aa42d4e425e29d3629f59f642d1686b13236e3134eb58cd7c84ea8b10720768bfa90420f82c99e6d7fe2ef03d287f958664c701f36c96d6f94a381325eb56af209a04668ef1c1b8bc39d5d6600fff3cfbc061b6c5a9d89761f618ac8eabe3cbb0e8b77be2f0fb'
    },
    production: {
        SITE_ENVIRONMENT: 'prduction',
        API_URL: 'https://api.servehub.io',
        API_KEY: '0f0653b3-d80a-4a01-9aa6c0f4dbfad794',
        STRAPI_API_URL : 'https://strapi.servehub.io',
        STRAPI_API_TOKEN : '732b2af58cbc5ab8280e8cb7ea96b15712071315816b1b85e69aa42d4e425e29d3629f59f642d1686b13236e3134eb58cd7c84ea8b10720768bfa90420f82c99e6d7fe2ef03d287f958664c701f36c96d6f94a381325eb56af209a04668ef1c1b8bc39d5d6600fff3cfbc061b6c5a9d89761f618ac8eabe3cbb0e8b77be2f0fb'
    }
};

