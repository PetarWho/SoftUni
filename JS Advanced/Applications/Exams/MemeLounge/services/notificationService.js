import { html, render } from '../node_modules/lit-html/lit-html.js'

const notificationTemplate = (message) => html`
<!-- Notifications -->
<section id="notifications">
    <div id="errorBox" class="notification" style="display:block">
        <span>${message}</span>
    </div>
</section>
`;

export const showNotification = (message) => {
        render(notificationTemplate(message), document.querySelector('#notificationBox'));

    const removeNotification = () =>{
        document.querySelector('#notificationBox').innerHTML='';
    }
    window.setTimeout(removeNotification,3000);
}