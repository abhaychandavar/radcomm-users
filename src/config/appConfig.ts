const appConfig = {
    port: Number(String(process.env.PORT || '9093')),
    gcp: {
        project: process.env.GCP_PROJECT || 'aerial-resolver-403306',
        region: process.env.GCP_REGION || 'asia-south1'
    },
    gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:9090',
    internalAuthToken: process.env.INTERNAL_AUTH_TOKEN ||'ASDJ@#LJNHJKNasd*7',
    jwt: {
        secret: process.env.JWT_SECRET || 'nhjaASDhjL<>GHIK R&GBV^t7o8li<KUQRH#'
    },
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/radapp'
    }
}

export default appConfig;