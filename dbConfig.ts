let cosmosDbConfig: any = {};

cosmosDbConfig.host = process.env.HOST || "https://jacwucosmos.documents.azure.com:443/";
cosmosDbConfig.authKey = process.env.AUTH_KEY || "u3LWV9YreKzUFnEqjPlRQXLlldpFszYbwk5CIzGWZplhbeYZbOA7qrLvMcE23JcOi7ziCpmWnN4z5k1XRBzUBg==";

export {cosmosDbConfig};