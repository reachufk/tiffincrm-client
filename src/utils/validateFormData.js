export const validateFormData = (name, value) => {
    let text = "";
    const regex = /^[a-zA-Z]+$/
    switch (name) {
        case 'firstName':
            if (!value || !value.trim()) {
                return text = `First Name is required`
            } else {
                if (value) {
                    const isValidFirstName = regex.test(String((value.trim())));
                    if (!isValidFirstName) {
                        return text = `Invalid first name, you can use only letters`
                    }
                }
            }
            break;
        case 'lastName':
            if (!value || !value.trim()) {
                return text = `Last Name is required`
            } else {
                if (value) {
                    const isValidLastName = regex.test(String((value.trim())));
                    if (!isValidLastName) {
                        return text = `Invalid last name, you can use only letters`
                    }
                }
            }
            break;
        case 'email':
            if (!value || !value.trim()) {
                return text = `Email is required`
            } else {
                if (value) {
                    const isValidEmail = String(value.trim()).toLowerCase().match(/^(([^<>()!#$%&*-_=+`~/?'[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                    if (!isValidEmail) {
                        return text = `Invalid email`
                    }
                }
            }
            break;
        case 'password':
            if (!value || !value.trim()) {
                return text = `Password is required`
            } else {
                if (String(value.trim()).length < 8) {
                    return text = `Use 8 or more characters with a mix of letters, numbers & symbols`
                }
            }
            break;
        case 'message':
            if (!value || !value.trim()) {
                return text = `Message is required`
            }
            break;
    }
    return text = ``
}