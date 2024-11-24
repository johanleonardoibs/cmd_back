export enum Errors {
    // Bad Request
    B_USER00 = 'errors.user.bad_login',
    B_USER01 = 'errors.user.bad_register',
    B_ANY00 = 'errors.{table}.foreign',

    // NotFound Request
    N_ANY00 = 'errors.{table}.not_found',

    // Conflict
    C_ANY00 = 'errors.{table}.already_exists',

    // Codes
    Z_UNAUTHORIZED = 401,
    Z_FORBIDDEN = 403,
    Z_INTERNAL = 500,
}
