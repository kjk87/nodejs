
export function getValidatePhoneNumber(phone: string) {
    if(!phone) return null
    return phone.replace(/[\s-+()]+/ig, '');
}

export function getMatchLoginId(loginId: string) {
    return RegExp(/^[a-zA-Z0-9]{4,20}$/).test(loginId);
}