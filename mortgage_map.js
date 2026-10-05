function addMortgageMap(paper, abstractDetails) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'map-toggle';
    toggle.textContent = '[ visual map ]';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mortgage-map');
    paper.classList.add('has-paper-website');
    abstractDetails.querySelector('summary').appendChild(toggle);

    const panel = document.createElement('section');
    panel.id = 'mortgage-map';
    panel.className = 'mortgage-map';
    panel.hidden = true;
    const picture = document.createElement('img');
    picture.className = 'map-image';
    picture.alt = 'County-level share of mortgage dollars on lots, animated from 1880 to 1889. Gray indicates unavailable data.';
    panel.appendChild(picture);
    paper.appendChild(panel);

    toggle.addEventListener('click', event => {
        event.preventDefault();
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(!panel.hidden));
        toggle.textContent = panel.hidden ? '[ visual map ]' : '[ hide map ]';
        if (!panel.hidden && !picture.hasAttribute('src')) {
            picture.src = 'papers/hist_mort/maps/urban-share.gif?v=2';
        }
    });
}
