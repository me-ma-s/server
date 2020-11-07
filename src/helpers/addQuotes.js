function addQuotes(param) {
  console.log(typeof param)
  if (param instanceof Date) {
    return "'" + JSON.stringify(param).slice(1, -1) + "'"
  }
  else if (!param) {
    return 'null'
  }
  else switch (typeof (param)) {
    case 'number':
      return param;

    case 'object':
      return "'" + JSON.stringify(param) + "'";

    default:
      return "'" + param.toString() + "'";
  }
}

module.exports = { addQuotes };
