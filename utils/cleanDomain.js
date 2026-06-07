function cleanDomain(url) {

    return url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/$/, "");
}

module.exports = {
    cleanDomain,
};