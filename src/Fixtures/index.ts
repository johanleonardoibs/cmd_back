import { userFixtures } from './UserFixtures'
import DatabaseConnection from '../Utils/DatabaseConnection.ts'

await userFixtures()
await DatabaseConnection.end()
