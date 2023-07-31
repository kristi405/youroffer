export const validateEmail = (email) => {
  const re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
  return re.test(String(email).toLowerCase())
}

export const validateDate = (dateStr) => {
  const re = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.\d{4}$/
  return re.test(dateStr)
}

export const VALIDATE_RULES = {
  required: 'required',
  email: 'email',
  date: 'date'
}

export const validate = (validateData, validateConfig) => {
  let isValid = true;
  for (const key in validateConfig) {
    if (validateConfig[key].rules.includes(VALIDATE_RULES.required)) {
      if (!validateData[key]) {
        validateConfig[key].isValid = false
        isValid = false
        continue
      }
    }

    if (validateConfig[key].rules.includes(VALIDATE_RULES.email)) {
      validateConfig[key].isValid = validateData[key] ? validateEmail(validateData[key]) : true
      if (!validateConfig[key].isValid) {
        isValid = false
        continue
      }
    }

    if (validateConfig[key].rules.includes(VALIDATE_RULES.date)) {
      validateConfig[key].isValid = validateData[key] ? validateDate(validateData[key]) : true
      if (!validateConfig[key].isValid) {
        isValid = false
        continue
      }
    }
  }

  return isValid;
}

export const resetValidation = (validateConfig) => {
  for (const key in validateConfig) {
    validateConfig[key].isValid = true
  }
}

export const resetValidationByKey = (validateConfig, key) => {
  if (validateConfig[key]) {
    validateConfig[key].isValid = true
  }
}