function addQuotes(param) {
  switch (typeof (param)) {
    case 'object':
      if (param === null) {
        return 'null';
      } else {
        return "'" + JSON.stringify(param) + "'";
      }
    case 'undefined':
      return 'null';
    case 'numeric':
      return param;
    default:
      return "'" + param.toString() + "'";
  }
}

module.exports = { addQuotes };
