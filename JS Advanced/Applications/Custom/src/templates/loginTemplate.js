import { html } from "../../node_modules/lit-html/lit-html.js";

export const loginTemplate = (loginHandler) => html`
        <div id="login-form">
            <form @submit = ${loginHandler}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3">
                    <a>Don't have an account?</a>
                    <a href="/register", id="register">Create one for free</a>
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe">
                    <label class="rememberMe-label" for="rememberMe">Remember me</label>
                </div> -->
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
`;