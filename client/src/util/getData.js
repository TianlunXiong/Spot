export default function getData (url) {
    return fetch(url, {
        credentials: "include",
        referrer: "no-referrer"
    }).then(response => response.json());
}
