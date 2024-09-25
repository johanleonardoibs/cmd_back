import app from './app.ts'
import { environment } from './Utils/environment.ts'
import DatabaseConnection from './Utils/DatabaseConnection.ts'

DatabaseConnection.connect().then(() => {
    app.listen(environment.APP_PORT, () => {
        console.log('Server listening on port', environment.APP_PORT)
    })
})
