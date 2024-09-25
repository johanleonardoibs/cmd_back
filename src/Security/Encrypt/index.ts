export const encryptPassword = async (password: string) => {
    return Bun.password.hash(password, {
        algorithm: 'argon2d',
        timeCost: 2,
    })
}

export const decryptPassword = async (password: string, hash: string) => {
    return Bun.password.verify(password, hash)
}
