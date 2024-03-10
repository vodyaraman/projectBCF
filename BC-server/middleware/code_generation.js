const generateAuthorizationCode = () => {
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 1000); // Генерация случайного числа от 0 до 999
    }
    const formatNumber = (number) => {
        return String(number).padStart(3, '0'); // Форматирование числа в виде строки "999"
    }
    const generateCode = () => {
        const firstPart = formatNumber(generateRandomNumber());
        const secondPart = formatNumber(generateRandomNumber());
        const thirdPart = formatNumber(generateRandomNumber());
        return `${firstPart}-${secondPart}-${thirdPart}`; // Генерация кода авторизации в формате "999-999-999"
    }
    return generateCode()
}

module.exports = generateAuthorizationCode