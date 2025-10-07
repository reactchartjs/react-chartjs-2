import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalDocSidebar from '@theme-original/DocSidebar';

function reload() {
  if (typeof ethicalads !== 'undefined') {
    ethicalads.reload();
  } else {
    setTimeout(reload, 300);
  }
}

export default function DocSidebar(props) {
  const bannerRef = useRef();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!document.getElementById('eab')) {
      const banner = document.createElement('div');

      bannerRef.current = banner;
      banner.className = 'flat horizontal'
      banner.id = 'eab';
      banner.setAttribute('data-ea-publisher', 'react-chartjs-2jsorg');
      banner.setAttribute('data-ea-type', 'image');
      document.querySelector('.theme-doc-sidebar-menu')?.parentElement?.appendChild(banner);
      reload();
    }
  }, []);

  useEffect(() => {
    bannerRef.current?.classList.toggle('dark', colorMode === 'dark');
  }, [colorMode]);

  return (
    <OriginalDocSidebar {...props} />
  );
}
