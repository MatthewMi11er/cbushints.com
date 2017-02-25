/* global ga */
import Modernizr from 'modernizr';

/**
 * See: http://youmightnotneedjquery.com/#ready
 * @param {function} fn Function to call when document is ready.
 * @returns {void}
 */
export function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export function googleAnalytics(trackingID) {
  window.ga = window.ga || function ga(...args) {
    (ga.q = ga.q || []).push(args);
  };
  ga.l = +new Date();

  const GA_LOCAL_STORAGE_KEY = 'ga:clientId';

  if (Modernizr.localstorage) {
    // Use localstorage
    ga('create', trackingID, {
      storage: 'none',
      clientId: localStorage.getItem(GA_LOCAL_STORAGE_KEY),
    });
    ga((tracker) => {
      localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
    });
  }

  if (!Modernizr.localstorage) {
    // Fall back to cookies
    ga('create', trackingID, 'auto');
  }

  ga('send', 'pageview');
}
