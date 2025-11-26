// Load papers dynamically from metadata files
async function loadPapers() {
    const paperFolders = ['ai-zoning', 'hist_mort'];
    const researchList = document.getElementById('research-list');
    
    for (const folder of paperFolders) {
        try {
            const response = await fetch(`papers/${folder}/metadata.txt`);
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
                }
            });
            
            // Create paper element
            const paperDiv = document.createElement('div');
            paperDiv.className = 'research-paper';
            
            // Title link
            const titleLink = document.createElement('a');
            titleLink.href = metadata.link;
            titleLink.target = '_blank';
            titleLink.className = 'paper-title-link';
            
            const title = document.createElement('h3');
            title.textContent = metadata.title;
            titleLink.appendChild(title);
            paperDiv.appendChild(titleLink);
            
            // Co-authors
            if (metadata.coauthors) {
                const authors = document.createElement('p');
                authors.className = 'authors';
                authors.textContent = `with ${metadata.coauthors}`;
                paperDiv.appendChild(authors);
            }
            
            // Image
            const image = document.createElement('img');
            image.src = `papers/${folder}/image.png`;
            image.alt = metadata.title;
            image.className = 'paper-image';
            paperDiv.appendChild(image);
            
            // Abstract
            const abstract = document.createElement('p');
            abstract.className = 'abstract';
            abstract.textContent = metadata.abstract;
            paperDiv.appendChild(abstract);
            
            researchList.appendChild(paperDiv);
            
        } catch (error) {
            console.error(`Error loading paper from ${folder}:`, error);
        }
    }
}

// Load papers when DOM is ready
document.addEventListener('DOMContentLoaded', loadPapers);

