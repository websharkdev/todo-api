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
};


export default configureOpenAPI