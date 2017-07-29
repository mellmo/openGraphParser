
function parseMeta(html) {
    const metaTagRegex = /\<meta property="og:.*".*\/\>/gi;
    const meta = {};
    const matches = html.match(metaTagRegex);

    for (var i = matches.length; i--;) {
        let metaName = matches[i].split('og:');
        if (metaName.length > 1){
            metaName = metaName[1].split('"');
        } else {
            break;
        }
        if (metaName.length > 1){
            metaName = metaName[0];
        } else {
            break;
        }
        let metaValue = matches[i].split('content="');
        if (metaValue.length > 1){
            metaValue = metaValue[1].split('"');
        } else {
            break;
        }
        if (metaValue.length > 1){
            metaValue = metaValue[0];
        } else {
            break;
        }
        meta[metaName] = metaValue;
    }
    return meta;
}

async function fetchHtml(url) {
    let result;

    try {
        result = await fetch(url);

        if (result.status >= 400) {
            throw new Error(result._bodyText);
        }
    } catch (e) {
        throw new Error('An error has occured while fetching url content', e);
    }

    return result._bodyText;
}

function getFirstUrl(content) {
    const regexp = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    const url = regexp.exec(content);

    if (url) {
        return url[0];
    } else {
        throw new Error('Could not find an html link');
    }
}

async function extractMeta(content = '') {
    try {
        return await fetchHtml(getFirstUrl(content)).then((html) => {
            return parseMeta(html);
        });
    } catch (e) {
        console.info(e);
        return {};
    }
}

module.exports = {
    extractMeta,
    parseMeta
};
