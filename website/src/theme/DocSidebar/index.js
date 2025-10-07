import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import OriginalDocSidebar from '@theme-original/DocSidebar';

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

      if (typeof ethicalads !== 'undefined') {
        ethicalads.reload();
      }
    }
  }, []);

  useEffect(() => {
    bannerRef.current?.classList.toggle('dark', colorMode === 'dark');
  }, [colorMode]);

  return (
    <OriginalDocSidebar {...props} />
  );
}
