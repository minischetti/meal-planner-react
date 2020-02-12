export const requestClient = {};
const apiBaseUrl = "http://localhost:8000/api/";

requestClient.getProfile = payload => {
    const profileId = payload.profileId;
    fetch(apiBaseUrl + "people/" + profileId, fetchConfig(FETCH_METHOD.GET))
    .then(response => response.json()).then(data => data);
}

/**
 * Default fetch configuration.
 *
 * @param {FETCH_METHOD} method - HTTP request method
 * @param {object} body - HTTP request body
 *
 * @return {object} fetch configuration
 */
const fetchConfig = (method, body) => {
    let fetchBody = typeof body === "string" ? body : JSON.stringify(body);
    return {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        // credentials: "same-origin",
        body: fetchBody,
    };
};

/**
 * Fetch methods.
 * @type {{DELETE: string, POST: string, GET: string, PUT: string}}
 */
const FETCH_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};