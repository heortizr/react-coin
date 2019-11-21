/**
 * Check the response if it is not ok, it will throw an error
 * 
 * @param {object} response 
 */
export const handleResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}
