console.log("incluir.js is running...");

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header-placeholder", "./header.html");
    loadHTML("footer-placeholder", "./footer.html");
});

function loadHTML(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${url}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(error));
}