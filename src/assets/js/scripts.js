let portuguese = document.getElementById('pt_lang'),
    english = document.getElementById('en_lang'),
    spanish = document.getElementById('es_lang');

portuguese.addEventListener('click', function () {
    var page = window.location.pathname;
    page = page.replace("es/", "")
    page = page.replace("/es", "")
    page = page.replace("en/", "")
    page = page.replace("/en", "")
    console.log(page)
    if (!page.startsWith('/')) {
        page = '/' + page
    }
    if (page === "") {
        window.location.replace("/")
    } else {
        window.location.replace('http://' + window.location.host + page)
    }
}, false);

english.addEventListener('click', function () {
    var page = window.location.pathname;
    page = page.replace("/es/", "")
    page = page.replace("/es", "")
    page = page.replace("/en", "")
    if (!page.startsWith('/')) {
        page = '/' + page
    }
    if (page === "") {
        window.location.replace("/en")
    } else {
        window.location.replace('http://' + window.location.host + "/en" + page)
    }
}, false);

spanish.addEventListener('click', function () {
    var page = window.location.pathname;
    page = page.replace("/en/", "")
    page = page.replace("/en", "")
    window.location.replace("/es")
    if (!page.startsWith('/')) {
        page = '/' + page
    }
    if (page === "") {
        window.location.replace("/")
    } else {
        window.location.replace('http://' + window.location.host + "/es" + page)
    }
}, false);