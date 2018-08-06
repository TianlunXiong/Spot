export default function (url, data) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return fetch(url, {
        body: formData,
        cache: "no-cache",
        credentials: "include",
        method: "POST",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer"
    }).then(response => response.json());
}
