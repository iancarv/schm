export const type = (value, option) => {
  if (Array.isArray(option)) {
    return (Array.isArray(value) ? value : [value])
      .map(val => type(val, option[0]))
  }
  switch (option.name) {
    case 'RegExp': return new RegExp(value, 'i')
    case 'Date': return new Date(/^\d{5,}$/.test(value) ? Number(value) : value)
    case 'Boolean': return !(value === 'false' || value === '0' || !value)
    case 'Number': return Number(value)
    case 'Object': return Object(value)
    default: return String(value)
  }
}

export const set = (value, option) => {
  if (typeof option === 'function') {
    return option(value)
  }
  throw new Error('[schm] `set` option must be a function')
}

export const get = (value, option) => {
  if (typeof option === 'function') {
    return option(value)
  }
  throw new Error('[schm] `get` option must be a function')
}

export const defaultParser = (value, option) => {
  if (value === 'undefined' || value == null || value === '' || Number.isNaN(value)) {
    return option
  }
  return value
}
