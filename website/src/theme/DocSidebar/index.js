import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'bwndw_fallback_cached';
const COOKIE_DURATION = 28; // days (4 weeks)

async function shouldUseFallback() {
  const cached = Cookies.get(COOKIE_NAME);

  if (cached !== undefined) {
    return cached === 'true';
  }

  while (typeof ethicalads === 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const placements = await ethicalads.wait;
  const useFallback = !placements.length || placements[0].response.campaign_type !== 'paid';

  Cookies.set(COOKIE_NAME, useFallback.toString(), {
    expires: COOKIE_DURATION,
    sameSite: 'lax'
  });

  return useFallback;
}

function createEthicalAdsBlock(root) {
  const banner = document.createElement('div');

  banner.className = 'eab flat horizontal'
  banner.id = 'bwndw';
  banner.setAttribute('data-ea-publisher', 'react-chartjs-2jsorg');
  banner.setAttribute('data-ea-type', 'image');

  root?.appendChild(banner);

  if (typeof ethicalads !== 'undefined') {
    ethicalads.reload();
  }

  return banner;
}

function createCarbonAdsBlock(root) {
  const banner = document.createElement('div');
  const script = document.createElement('script');

  banner.className = 'crbn';
  banner.id = 'bwndw';

  script.src = '//cdn.carbonads.com/carbon.js?serve=CWBDT53N&placement=react-chartjs-2jsorg&format=cover';
  script.id = '_carbonads_js';
  script.async = true;

  banner.appendChild(script);
  root?.appendChild(banner);

  return banner;
}

function setColorMode(banner, colorMode) {
  banner?.classList.toggle('dark', colorMode === 'dark');
}

export default function DocSidebar(props) {
  const bannerRef = useRef();
  const { colorMode } = useColorMode();
  const colorModeRef = useRef(colorMode);

  colorModeRef.current = colorMode;

  useEffect(() => {
    if (!document.getElementById('bwndw')) {
      shouldUseFallback().then((useFallback) => {
        if (!document.getElementById('bwndw')) {
          const root = document.querySelector('.theme-doc-sidebar-menu')?.parentElement;

          bannerRef.current = useFallback ? createCarbonAdsBlock(root) : createEthicalAdsBlock(root);
          setColorMode(bannerRef.current, colorModeRef.current);
        }
      });
    }
  }, []);

  useEffect(() => {
    setColorMode(bannerRef.current, colorMode);
  }, [colorMode]);

  return (
    <OriginalDocSidebar {...props} />
  );
}
