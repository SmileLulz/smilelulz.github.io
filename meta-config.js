(function () {
    const baseMeta = {
        siteName: "SmileLulz - Indie Game Developer",
        siteUrl: "https://smilelulz.com",
        siteDescription: "An indie game developer making simple and fun games.",
        themeColor: "#0a0a0a",
        image: "/icons/og-banner.png",
        iconPath: "/icons/",
    };

    const pageMeta = {
        '/': {
            title: "SmileLulz • Indie Game Developer",
            description: "An indie game developer making simple and fun games. Discover games, updates, and support the developer.",
            image: "/images/og-banner.png"
        },
        '/games/smashbit/': {
            title: "Smashbit • Arcade Defense Clicker Game",
            description: "Download Smashbit - An arcade-defense clicker game with fun, simple gameplay and satisfying sound effects.",
            image: "/images/og-smashbit.png"
        },
        '/about': {
            title: "About SmileLulz",
            description: "Learn more about SmileLulz - indie game developer creating fun, accessible games with simple mechanics.",
            image: "/images/og-banner.png"
        },
        '/socials': {
            title: "SmileLulz • Social Platforms",
            description: "Connect with SmileLulz across all platforms - games, social media, and support links.",
            image: "/images/og-banner.png"
        }
    };

    const currentPath = window.location.pathname;
    const currentPageMeta = pageMeta[currentPath] || pageMeta['/'];
    
    const finalMeta = {
        ...baseMeta,
        ...currentPageMeta,
        url: baseMeta.siteUrl + currentPath
    };

    const head = document.head;

    head.insertAdjacentHTML(
        "beforeend",
        `
        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="57x57" href="${finalMeta.iconPath}apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="${finalMeta.iconPath}apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="${finalMeta.iconPath}apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="${finalMeta.iconPath}apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="${finalMeta.iconPath}apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="${finalMeta.iconPath}apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="${finalMeta.iconPath}apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="${finalMeta.iconPath}apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${finalMeta.iconPath}apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="${finalMeta.iconPath}android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${finalMeta.iconPath}favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${finalMeta.iconPath}favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${finalMeta.iconPath}favicon-16x16.png">
        <link rel="manifest" href="${finalMeta.iconPath}manifest.json">
        <meta name="msapplication-TileColor" content="${finalMeta.themeColor}">
        <meta name="msapplication-TileImage" content="${finalMeta.iconPath}ms-icon-144x144.png">
        <meta name="theme-color" content="${finalMeta.themeColor}">

        <!-- SEO + Social -->
        <meta name="description" content="${finalMeta.description}">
        <meta property="og:title" content="${finalMeta.title}">
        <meta property="og:description" content="${finalMeta.description}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${finalMeta.url}">
        <meta property="og:image" content="${finalMeta.siteUrl}${finalMeta.image}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${finalMeta.title}">
        <meta name="twitter:description" content="${finalMeta.description}">
        <meta name="twitter:image" content="${finalMeta.siteUrl}${finalMeta.image}">
    `
    );

    document.title = finalMeta.title;
})();