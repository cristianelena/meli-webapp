export default (markup, context) => `
    <!DOCTYPE html>
        <head>
            <title>Mercado Libre Web App</title>
            <link rel="stylesheet" href="/styles.css">
            <script>window.__initialStore = ${ JSON.stringify(context) }</script>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="root">${ markup }</div>
        </body>
    </html>
`;
