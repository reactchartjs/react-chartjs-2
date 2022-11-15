/* eslint-disable */
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import 'vitest-canvas-mock';

expect.extend(matchers);

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
