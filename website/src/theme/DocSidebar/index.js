import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'bwndw_cached_use_fallback';
const COOKIE_DURATION = 28; // days (4 weeks)

function saveUseFallback(value) {
  Cookies.set(COOKIE_NAME, value.toString(), {
    expires: COOKIE_DURATION,
    sameSite: 'lax'
  });
}

function readUseFallback() {
  const cached = Cookies.get(COOKIE_NAME);

  return cached === undefined
    ? null
    : cached === 'true';
}

let scriptPromise = null;

async function loadEthicalAdsScript() {
  let script = document.getElementById('ethical-script');

  if (!script) {
    script = document.createElement('script');
    script.id = 'ethical-script';
    script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
    script.async = true;
    document.head.appendChild(script);

    scriptPromise = (async () => {
      while (typeof ethicalads === 'undefined') {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return (await ethicalads.wait) || [];
    })()
  }

  return scriptPromise
}

function createEthicalAdsBlock(root) {
  const banner = document.createElement('div');

  banner.className = 'eab flat horizontal bwndw-loading'
  banner.id = 'bwndw';
  banner.setAttribute('data-ea-publisher', 'react-chartjs-2jsorg');
  banner.setAttribute('data-ea-type', 'image');

  root?.appendChild(banner);

  if (typeof ethicalads !== 'undefined') {
    ethicalads.load();
  }

  return banner;
}

function createCarbonAdsBlock(root) {
  const banner = document.createElement('div');
  const script = document.createElement('script');

  banner.className = 'crbn bwndw-loading';
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
      const root = document.querySelector('.theme-doc-sidebar-menu')?.parentElement;
      let banner
      const showBanner = () => {
        setColorMode(banner, colorModeRef.current);
        bannerRef.current = banner;
        banner.classList.remove('bwndw-loading');
      }
      const cachedUseFallback = readUseFallback();

      if (cachedUseFallback === true) {
        banner = createCarbonAdsBlock(root);
        showBanner();
      } else {
        banner = createEthicalAdsBlock(root);

        loadEthicalAdsScript().then((placements) => {
          if (cachedUseFallback === null) {
            const useFallback = !placements.length || placements[0].response.campaign_type !== 'paid';

            if (useFallback) {
              banner.remove();
              banner = createCarbonAdsBlock(root);
            }

            saveUseFallback(useFallback);
          }

          showBanner();
        })
      }
    }
  }, []);

  useEffect(() => {
    setColorMode(bannerRef.current, colorMode);
  }, [colorMode]);

  return (
    <OriginalDocSidebar {...props} />
  );
}
