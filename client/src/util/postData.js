export default function (url, data, headers) {
    return fetch(url, {
        body: data,
        headers,
        credentials: "include",
        method: "POST",
        mode: "cors",
        redirect: "follow"
    }).then(response => response.json());
}
