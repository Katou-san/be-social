import bcrypt = require('bcrypt');

const saltRounds = 10

export const HashPassword = async (pass: string) => {
    try {
        return await bcrypt.hash(pass, saltRounds);
    } catch (error) {
        console.error(">> Hash pass error")
        console.log(error)
    }
}

export const CheckPassword = async ({ hashPass = '', pass }: { hashPass: string, pass: string }) => {
    try {
        return await bcrypt.compare(pass, hashPass)
    } catch (error) {
        console.error(">> Compare pass error")
        console.log(error)
        return false
    }
}