// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToQueryString<T extends Record<string, any>>(params: T) {
  const queryString = Object.keys(params)
    .filter((key) => key !== '' && params[key] !== null && params[key] !== undefined)
    .map((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        let value = params[key].toString();

        // Check if the value starts with "&" and replace it with "%26"
        if (value.startsWith('&')) {
          value = '%26' + value.substring(1);
        }

        // Check if the value starts with a hyphen "-" and replace it with "%20"
        // if (value.startsWith('-')) {
        //   value = '%20' + value.substring(1);
        // }

        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
      return encodeURIComponent(key) + '=';
    })
    .join('&');

  return queryString;
}
