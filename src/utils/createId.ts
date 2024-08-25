const createId = (table: string) => {
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    return '@' + table + Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, '0') + randomNumber
}

export { createId }