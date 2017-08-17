import serialize from 'serialize-javascript';

export default (markup, data) => `
    <!DOCTYPE html>
        <head>
            <title>Mercado Libre</title>
            <meta charSet="utf-8">
            <link rel="preconnect" href="//mla-d1-p.mlstatic.com">
		    <link rel="preconnect" href="//mla-d2-p.mlstatic.com">
		    <link rel="preconnect" href="//mla-s1-p.mlstatic.com">
		    <link rel="preconnect" href="//mla-s2-p.mlstatic.com">
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <meta http-equiv="cleartype" content="on">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		    <link rel="shortcut icon" href="https://http2.mlstatic.com/resources/frontend/commons-frontend/ui-dist/images/components/navigation/ML/favicon.d865b493.ico" />
            <link rel="stylesheet" href="/styles.css">
            <script>window.__initialState = ${ serialize(data) }</script>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="root">${ markup }</div>
        </body>
    </html>
`;
