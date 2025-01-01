import '@testing-library/jest-dom/vitest';

import 'vitest-canvas-mock';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

class MutationObserver {
  disconnect() {}
  unobserve() {}
  observe() {}
}

window.MutationObserver = MutationObserver;
