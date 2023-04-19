const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-].+(?:\.[a-zA-Z0-9-]+)*$/;

export const emailValidation = (email) => {
    if (email.match(validRegex)) {
        return true
    } else {
        return false
    }
}

export const passwordValidation = (password) => {
    if (password.length > 7) {
        return true
    } else {
        return false
    }
}
