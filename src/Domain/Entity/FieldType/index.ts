import { pgEnum } from 'drizzle-orm/pg-core'

export const fieldTypeEnum = pgEnum('field_type', [
    'text',
    'number',
    'file',
    'date',
])

export enum FieldType {
    TEXT = 'text',
    NUMBER = 'number',
    FILE = 'file',
    DATE = 'date',
}
