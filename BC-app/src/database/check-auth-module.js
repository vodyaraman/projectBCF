class CheckAuth {
    static check(code) {
        const cleanedCode = code.replace(/[X\s]/g, '').toUpperCase();
        console.log(cleanedCode)
        if (cleanedCode.length === 11) {
            return cleanedCode;
        }
        else if (cleanedCode.length === 2 || cleanedCode === ""){
            return "";
        }
        else {
            return null;
        }
    }
}

export default CheckAuth;