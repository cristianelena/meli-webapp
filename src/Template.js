import serialize from 'serialize-javascript';

export default (markup, data) => `
    <!DOCTYPE html>
        <head>
            <title>Mercado Libre Web App</title>
            <link rel="stylesheet" href="/styles.css">
            <script>window.__initialState = ${ serialize(data) }</script>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="root">${ markup }</div>
        </body>
    </html>
`;
