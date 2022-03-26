import { html } from "../../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";


export const navbarTemplate = (ctx) =>
    html`
        <div id="navigation">
            <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">MovieBin</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                        ${  isAuthenticated()
                            ?html`
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">My Movies</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Upload Movie</a>
                            </li>
                            `:html`
                            `
                        }
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        ${  isAuthenticated()
                            ? html`
                            <div class="nav-item">
                                <a class="nav-link loggedIn" href="/logout">${localStorage.getItem('username')}</a>
                            </div>`
                            : html` 
                            <div class="nav-item">
                                <a class="nav-link login" href="/login">Login</a>
                            </div>`        
                        }
                    </div>
                </div>
            </nav>
        </div>
    `;