export const validateContactForm = (formData) => {
    let status = true;
    let text = "";
    const { firstName, lastName, phoneNumber, email, message } = formData;
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim() || !email.trim() || !message.trim()) {
        return {
            status: false,
            text: 'Please enter all fields'
        }
    }
    const phoneNum = phoneNumber.replace(/[^\d]/g, '');
    if (phoneNum.length !== 10) {
        return {
            status: false,
            text: 'Please enter valid phone number'
        }
    }
    const isValidEmail = String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isValidEmail) {
        return {
            status: false,
            text: 'Please enter valid email'
        }
    }
    return {
        status,
        text
    }

}