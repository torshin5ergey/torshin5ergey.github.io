// header-loader.js

function loadHeader() {
    fetch('/static/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });
}
document.addEventListener('DOMContentLoaded', loadHeader);

function openRandomArt() {
    const pages = [
        '/cellular-automata/conways-simulator/index.html',
        '/cellular-automata/langtons-ant/index.html',
        '/cellular-automata/langtons-ant-b2s2d8/index.html',
        '/cellular-automata/maze-rule/index.html',
        '/cellular-automata/wolframs-rules/index.html',
        '/drafts/dangerous-web/index.html',
    ];
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    window.location.href = randomPage;
}
