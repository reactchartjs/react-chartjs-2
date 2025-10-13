import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalDocSidebar from '@theme-original/DocSidebar';

async function shouldUseFallback() {
  return true; // Temporarily disable EthicalAds

  while (typeof ethicalads === 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const placements = await ethicalads.wait;

  return !placements.length || placements[0].response.campaign_type !== 'paid';
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
