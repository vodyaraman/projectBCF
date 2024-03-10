class CheckAuth {
    static check(code) {
        const cleanedCode = code.replace(/[X\s]/g, '').toUpperCase();
        if (cleanedCode.length === 11) {
            return cleanedCode;
        } else if (cleanedCode.length === 2 || cleanedCode === "") {
            return "";
        } else {
            return null;
        }
    }

    static checkPassword(password) {
        // Проверка длины пароля
        if (password.length < 3 || password.length > 16) {
            return false;
        }

        // Проверка наличия цифр и букв
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return false;
        }

        // Проверка на SQL-инъекции
        const sqlInjectionPatterns = /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|CREATE|ALTER)\b)|(\b(AND|OR|NOT|UNION|JOIN)\b)/i;
        if (sqlInjectionPatterns.test(password)) {
            return false;
        }

        return true;
    }

    static checkPasswordMatch(password1, password2) {
        return password1 === password2;
    }

    static checkLogin(login) {
        // Проверка длины логина
        if (login.length < 3 || login.length > 16) {
            return false;
        }

        // Проверка на мат в логине
        const profanityPatterns = /(бля|хуй|пизда|fuck|shit|suck)/i;
        if (profanityPatterns.test(login)) {
            return false;
        }

        // Проверка на SQL-инъекции
        const sqlInjectionPatterns = /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|CREATE|ALTER)\b)|(\b(AND|OR|NOT|UNION|JOIN)\b)/i;
        if (sqlInjectionPatterns.test(login)) {
            return false;
        }

        return true;
    }
}

export default CheckAuth;