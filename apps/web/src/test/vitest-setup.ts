import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

function createCanvas2dMock(): Partial<CanvasRenderingContext2D> {
  return {
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    scale: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    measureText: vi.fn(() => ({ width: 0 })),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4), width: 1, height: 1 })),
    putImageData: vi.fn(),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4), width: 1, height: 1 })),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
  };
}

// jsdom does not implement canvas 2D; DotGrid and similar call getContext('2d')
HTMLCanvasElement.prototype.getContext = function (
  this: HTMLCanvasElement,
  type: string
): CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | null {
  if (type === '2d') {
    return createCanvas2dMock() as unknown as CanvasRenderingContext2D;
  }
  return null;
};

// Home.tsx defers islands with requestIdleCallback; ensure it runs in jsdom
if (typeof window.requestIdleCallback !== 'function') {
  window.requestIdleCallback = (cb: IdleRequestCallback) => {
    const id = window.setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => 50,
      } as IdleDeadline);
    }, 0);
    return id as unknown as number;
  };
  window.cancelIdleCallback = (id: number) => {
    clearTimeout(id);
  };
}

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock console methods to reduce test output noise
global.console = {
  ...console,
  // Uncomment to suppress console output in tests
  // log: vi.fn(),
  // debug: vi.fn(),
  // info: vi.fn(),
  // warn: vi.fn(),
  // error: vi.fn(),
};

// Extend expect with custom matchers if needed
// expect.extend({ ... });
