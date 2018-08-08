export default function getData (url) {
    return fetch(url, {
        credentials: "include",
        mode: "cors"
    }).then(response => response.json());
}
