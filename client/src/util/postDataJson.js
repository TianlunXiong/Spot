
export default function (url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        },
        credentials: "include",
        method: "POST",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer"
    }).then(response => response.json());
}
