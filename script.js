// Research papers configuration
const papers = [
    {
        folder: 'ai-zoning',
        title: 'The Costs of Housing Regulation: Evidence From Generative Regulatory Measurement',
        link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4627587',
        abstract: 'We introduce "generative regulatory measurement," using Large Language Models to interpret administrative documents with 96% accuracy in binary classification and 0.87 correlation for continuous questions.  Our analysis of U.S. zoning regulations reveals four facts:  (1) Housing regulations are multidimensional with two main principal components. (2) The first principal component represents value capture in high housing demand areas. (3) The second principal component associates with exclusionary zoning, increasing housing costs and socioeconomic exclusion. (4) Zoning follows a monocentric pattern with regional variations and is especially strict in Northeast suburbs. We develop a model of municipal regulatory choice consistent with these facts.',
        coauthors: 'Alex Bartik, Arpit Gupta'
    },
    {
        folder: 'hist_mort',
        title: 'How Did Mortgage Market Segmentation Affect Early U.S. Urban Development?',
        link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5118259',
        abstract: 'How did historical financial markets shape urbanization? This paper studies the late 19th century, a time when the rate of urbanization peaked amid a large, highly heterogeneous, and mostly unintermediated mortgage market. I focus on the role of a new type of financial intermediary, the Building and Loan Association (B&L), in redirecting capital to urban development. Using newly digitized annual county-level mortgage data from 1880-1889 with nearly 30,000 observations and a complete history of B&L entry, I show suggestive evidence that the entry of the first B&L into a county reallocated capital from the rural to the urban mortgage market and accelerated real urbanization trends.',
        coauthors: null
    }
];

// Load research papers
document.addEventListener('DOMContentLoaded', () => {
    const researchList = document.getElementById('research-list');
    
    console.log('Loading papers...', papers);
    console.log('Research list element:', researchList);
    
    papers.forEach(paper => {
        const paperDiv = document.createElement('div');
        paperDiv.className = 'research-paper';
        
        const titleLink = document.createElement('a');
        titleLink.href = paper.link;
        titleLink.target = '_blank';
        titleLink.className = 'paper-title-link';
        
        const title = document.createElement('h3');
        title.textContent = paper.title;
        titleLink.appendChild(title);
        
        const authors = document.createElement('p');
        authors.className = 'authors';
        if (paper.coauthors) {
            authors.textContent = `with ${paper.coauthors}`;
        }
        
        const image = document.createElement('img');
        image.src = `papers/${paper.folder}/image.png`;
        image.alt = paper.title;
        image.className = 'paper-image';
        
        const abstract = document.createElement('p');
        abstract.className = 'abstract';
        abstract.textContent = paper.abstract;
        
        paperDiv.appendChild(titleLink);
        if (paper.coauthors) {
            paperDiv.appendChild(authors);
        }
        paperDiv.appendChild(image);
        paperDiv.appendChild(abstract);
        
        researchList.appendChild(paperDiv);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

