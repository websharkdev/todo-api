import { apiReference } from '@scalar/hono-api-reference';
import packageJSON from '../../package.json';
import { AppOpenAPI } from "./types";

const configureOpenAPI = (app: AppOpenAPI) => {
    app.doc('/doc', {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "Todo API"
        }
    })


    app.get(
        '/documentation',
        apiReference({
            pageTitle: 'Hono API Documentation',
            theme: 'mars',
            _integration: 'hono',
            defaultHttpClient: {
                targetKey: 'javascript',
                clientKey: "fetch"
            }, 
            spec: {
                url: '/doc',
            },
        }),
    )
};


export default configureOpenAPI