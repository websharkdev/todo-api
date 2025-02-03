import { AppOpenAPI } from "./types";
import packageJSON from '../../package.json'

const configureOpenAPI = (app: AppOpenAPI) => {
    app.doc('/doc', {
        openapi: "3.0.0",
        info: {
            version: '1.0.0',
            title: "Todo API"
        }
    })
};


export default configureOpenAPI