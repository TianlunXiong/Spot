export default function getData (url) {
    return fetch(url, {
        method: "GET",
        credentials: "include",
        mode: "cors"
    }).then(response => response.json());
}
