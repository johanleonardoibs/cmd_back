import { pgEnum } from 'drizzle-orm/pg-core'

export const entryTypeEnum = pgEnum('entryType', ['work', 'free'])

export enum EntryType {
    Work = 'work',
    Free = 'free',
}
