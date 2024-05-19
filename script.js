function openRandomArt() {
    let pages = [
        './cellular-automata/conways-simulator/index.html',
        './cellular-automata/langtons-ant/index.html'
    ];
    let randomPage = pages[Math.floor(Math.random() * pages.length)];
    window.open(randomPage, '_blank');
}