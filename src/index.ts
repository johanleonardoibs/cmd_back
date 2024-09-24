import app from "./app.ts";
import {environment} from "./Config/environment.ts";
import DatabaseConnection from "./Config/DatabaseConnection.ts";

DatabaseConnection.connect().then(() => {
    app.listen(environment.APP_PORT, () => {
        console.log('Server listening on port', environment.APP_PORT)
    })
})