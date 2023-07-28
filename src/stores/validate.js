import { makeAutoObservable } from 'mobx'
import { validate, resetValidation, resetValidationByKey } from '../services/validate'

class ValidateStore {
  schema = {}

  constructor(schema) {
    this.schema = schema;
    makeAutoObservable(this)
  }

  validate(data) {
    const isValid = validate(data, this.schema)
    this.schema = {...this.schema}
    return isValid
  }

  resetValidation() {
    resetValidation(this.schema)
    this.schema = {...this.schema}
  }

  resetValidationByKey(key) {
    resetValidationByKey(this.schema, key)
    this.schema = {...this.schema}
  }
}

export default ValidateStore