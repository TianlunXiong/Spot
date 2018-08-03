
export default function (url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        cache: "no-cache",
        credentials: "include",
        method: "POST",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer"
    }).then(response => response.json());
}
