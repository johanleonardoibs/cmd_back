import { faker } from '@faker-js/faker'
import { CitizenIdType, type NewUser, Role, users } from '@Domain/Entity'
import DatabaseConnection, { db } from '../../Utils/DatabaseConnection.ts'
import { encryptPassword } from '@Security/Encrypt'

export const userFixtures = async (): Promise<void> => {
    const password = await encryptPassword('0000000')

    const usersArray: NewUser[] = [...Array(10)].map(() => {
        return {
            name: faker.person.firstName(),
            email:
                faker.person.firstName() +
                Math.round(Math.random() * 20) +
                '@mail.com',
            role: Object.values(Role)[Math.round(Math.random() * 2)],
            password,
            citizenIdType:
                Object.values(CitizenIdType)[Math.round(Math.random() * 2)],
            citizenId: faker.number
                .int({ min: 888888, max: 999999 })
                .toString(),
            surname: faker.person.lastName(),
        }
    })

    await DatabaseConnection.connect()
    await db.delete(users)
    await db.insert(users).values(usersArray)
}
