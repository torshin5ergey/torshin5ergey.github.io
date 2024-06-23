// footer-loader.js

function loadFooter() {
    fetch('/static/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
}
document.addEventListener('DOMContentLoaded', loadFooter);
