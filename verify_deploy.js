fetch('https://apexx-bau-astro.netlify.app/')
    .then(r => r.text())
    .then(t => {
        console.log('--- CHECK RESULTS ---');
        // Check for the Canonical Link (pointing to apexx-bau.de)
        const hasCanonical = t.includes('rel="canonical"');
        const correctTarget = t.includes('href="https://www.apexx-bau.de/"') || t.includes('href="https://www.apexx-bau.de"');

        console.log(hasCanonical && correctTarget ? '✅ CANONICAL_FOUND_AND_CORRECT' : '❌ CANONICAL_issue');
        if (!hasCanonical) console.log('   -> Tag missing');
        if (hasCanonical && !correctTarget) console.log('   -> Tag present but wrong URL');

        // Check for Showroom Image
        console.log(t.includes('showroom') ? '✅ SHOWROOM_FOUND' : '❌ SHOWROOM_MISSING');

        // Check for NoIndex (Should be ABSENT on Production Context if my logic works for avoiding it on PROD)
        // Wait, the logic was: `!isProduction && <meta...noindex... />`
        // On the Netlify URL (which IS the production context), `isProduction` is true.
        // So `noindex` should be MISSING.
        console.log(!t.includes('content="noindex, nofollow"') ? '✅ NOINDEX_ABSENT (Correct for Production)' : '⚠️ NOINDEX_PRESENT (Warning)');

        console.log('--- HTML HEAD SNIPPET ---');
        const headEnd = t.indexOf('</head>');
        console.log(t.substring(0, headEnd > 0 ? headEnd + 7 : 500));
    })
    .catch(e => console.error(e));
