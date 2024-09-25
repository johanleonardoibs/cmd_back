import { environment } from './src/Utils/environment.ts'

export default {
    dialect: 'postgresql',
    schema: './src/Domain/Entity',
    out: './drizzle',
    dbCredentials: {
        url: environment.APP_DB,
    },
}
