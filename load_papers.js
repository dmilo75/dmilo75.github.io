// Load papers dynamically from metadata files
async function loadPapers() {
    const papers = [
        { folder: 'fed-speaks', list: 'research-list' },
        { folder: 'ai-zoning', list: 'research-list' },
        { folder: 'hist_mort', list: 'research-list' },
        { folder: 'origins-of-zoning', list: 'works-in-progress-list' },
        { folder: 'causal-effects-of-zoning', list: 'works-in-progress-list' }
    ];
    
    for (const paper of papers) {
        const folder = paper.folder;
        const researchList = document.getElementById(paper.list);
        try {
            const response = await fetch(`papers/${folder}/metadata.txt`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Metadata request failed: ${response.status}`);
            }
            const text = await response.text();
            
            // Parse metadata
            const lines = text.split('\n');
            const metadata = {};
            
            lines.forEach(line => {
                if (line.includes('Title:')) {
                    metadata.title = line.replace('Title:', '').trim();
                } else if (line.includes('Link:')) {
                    metadata.link = line.replace('Link:', '').trim();
                } else if (line.includes('Abstract:')) {
                    metadata.abstract = line.replace('Abstract:', '').trim();
                } else if (line.includes('Other Authors:')) {
                    metadata.coauthors = line.replace('Other Authors:', '').trim();
                } else if (line.startsWith('Availability:')) {
                    metadata.availability = line.replace('Availability:', '').trim();
                } else if (line.startsWith('Status:')) {
                    metadata.status = line.replace('Status:', '').trim();
                } else if (line.startsWith('Presentations:')) {
                    metadata.presentations = line.replace('Presentations:', '').trim();
                } else if (line.startsWith('Website:')) {
                    metadata.website = line.replace('Website:', '').trim();
                } else if (line.startsWith('Code:')) {
                    metadata.code = line.replace('Code:', '').trim();
                }
            });
            
            // Create paper element
            const paperDiv = document.createElement('div');
            paperDiv.className = 'research-paper';
            
            // Title link
            const titleLink = document.createElement('a');
            const alwaysExpanded = folder === 'fed-speaks';
            const details = document.createElement(alwaysExpanded ? 'div' : 'details');
            details.className = 'paper-details';
            const header = document.createElement('header');
            if (metadata.link) {
                titleLink.href = metadata.link;
            }
            titleLink.target = '_blank';
            titleLink.rel = 'noopener';
            titleLink.textContent = metadata.title;
            titleLink.className = 'paper-title-link';
            titleLink.dataset.analyticsEvent = `Paper Click: ${folder}`;
            
            const title = document.createElement('h3');
            title.className = 'paper-title';
            if (metadata.link) {
                title.appendChild(titleLink);
            } else {
                title.textContent = metadata.title;
            }
            header.appendChild(title);
            if (metadata.status) {
                const status = document.createElement('p');
                status.className = 'paper-status';
                status.textContent = metadata.status;
                header.appendChild(status);
            }
            
            // Co-authors
            if (metadata.coauthors) {
                const authors = document.createElement('span');
                authors.className = 'authors';
                authors.textContent = `with ${metadata.coauthors}`;
                header.appendChild(authors);
            }
            if (metadata.availability) {
                const availability = document.createElement('p');
                availability.className = 'paper-availability';
                availability.textContent = metadata.availability;
                header.appendChild(availability);
            }
            if (metadata.presentations) {
                const presentations = document.createElement('span');
                presentations.className = 'paper-presentations';
                const coauthorNote = metadata.presentations.includes('*') ? ' (* by coauthor)' : '';
                presentations.textContent = `Selected presentations${coauthorNote}: ${metadata.presentations}`;
                header.appendChild(presentations);
            }
            paperDiv.appendChild(header);
            if (!alwaysExpanded && metadata.abstract) {
                const summary = document.createElement('summary');
                const toggle = document.createElement('span');
                toggle.className = 'paper-toggle';
                summary.appendChild(toggle);
                details.appendChild(summary);
                details.addEventListener('toggle', () => {
                    if (details.open && typeof window.plausible === 'function') {
                        window.plausible(`Abstract Open: ${folder}`);
                    }
                });
            }
            
            // Abstract
            if (metadata.abstract) {
                const abstract = document.createElement('p');
                abstract.className = 'abstract';
                abstract.textContent = metadata.abstract;
                details.appendChild(abstract);
                paperDiv.appendChild(details);
            }
            if (metadata.link || metadata.website) {
                paperDiv.classList.add('has-paper-website');
                const resourceLinks = document.createElement('span');
                resourceLinks.className = 'paper-resource-links';
                if (metadata.link) {
                    const paperLink = document.createElement('a');
                    paperLink.href = metadata.link;
                    paperLink.target = '_blank';
                    paperLink.rel = 'noopener';
                    paperLink.textContent = '[ paper ]';
                    paperLink.dataset.analyticsEvent = `Paper Click: ${folder}`;
                    resourceLinks.appendChild(paperLink);
                }
                if (metadata.website) {
                    const website = document.createElement('a');
                    website.href = metadata.website;
                    website.target = '_blank';
                    website.rel = 'noopener';
                    website.textContent = '[ interactive map ]';
                    website.dataset.analyticsEvent = `Map Click: ${folder}`;
                    resourceLinks.appendChild(website);
                }
                if (metadata.code) {
                    const code = document.createElement('a');
                    code.href = metadata.code;
                    code.target = '_blank';
                    code.rel = 'noopener';
                    code.textContent = '[ code ]';
                    code.dataset.analyticsEvent = `Code Click: ${folder}`;
                    resourceLinks.appendChild(code);
                }
                const summary = details.querySelector('summary');
                if (summary) {
                    summary.appendChild(resourceLinks);
                } else {
                    paperDiv.appendChild(resourceLinks);
                }
            }
            
            if (folder === 'hist_mort') {
                addMortgageMap(paperDiv, details);
            }
            researchList.appendChild(paperDiv);
            
        } catch (error) {
            console.error(`Error loading paper from ${folder}:`, error);
        }
    }
}

// Load papers when DOM is ready
document.addEventListener('DOMContentLoaded', loadPapers);
