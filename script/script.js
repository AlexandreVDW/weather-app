importScript('script/app.js');

function importScript(scriptPath) {
    const script = document.createElement('script');
    script.src = scriptPath;
    script.async = false; // Synchronise le chargement du script
    document.head.appendChild(script);
}


