class ProjectCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'image', 'alt', 'description', 'link'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 10px;
                    border: 1px solid var(--card-border-color, #ccc);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    width: 400px; 
                    min-height: auto; 
                }
                .container {
                    display: grid;
                    grid-template-rows: auto 150px auto auto;
                    gap: 10px;
                    padding: 20px;
                    overflow-y: auto;
                    max-height: 400px;
                }
                h2 {
                    color: var(--card-title-color, #333);
                    font-size: 1.5em;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                img {
                    width: 100%;
                    max-height: 150px;
                    object-fit: cover;
                }
                p {
                    color: var(--text-color, #666);
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                a {
                    display: inline-block;
                    margin-top: 10px;
                    color: var(--link-color, blue);
                    text-decoration: none;
                    padding: 8px 16px;
                    background-color: var(--button-bg, #f0f0f0);
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                a:hover {
                    text-decoration: underline;
                    background-color: var(--button-hover-bg, #e0e0e0);
                }
            </style>
            <div class='container'>
                <h2></h2>
                <img src="" alt="">
                <p></p>
                <a href="" target="_blank">Learn more</a>
            </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} updated from "${oldValue}" to "${newValue}"`);
        switch(name) {
            case 'title':
                this.shadowRoot.querySelector('h2').textContent = newValue;
                break;
            case 'image':
                this.shadowRoot.querySelector('img').src = newValue;
                break;
            case 'alt':
                this.shadowRoot.querySelector('img').alt = newValue;
                break;
            case 'description':
                this.shadowRoot.querySelector('p').textContent = newValue;
                break;
            case 'link':
                this.shadowRoot.querySelector('a').href = newValue;
                break;
        }
    }
}

customElements.define('project-card', ProjectCard);
