import { Capacitor } from '@capacitor/core';

/**
 * Check if the app is running in a Capacitor native environment
 */
export function isCapacitor(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Check if the app is running on iOS
 */
export function isIOS(): boolean {
  return Capacitor.getPlatform() === 'ios';
}

/**
 * Check if the app is running on Android
 */
export function isAndroid(): boolean {
  return Capacitor.getPlatform() === 'android';
}

/**
 * Check if payments are disabled (iOS build or environment variable)
 * Apple requires in-app purchases, so we disable Stripe payments on iOS
 */
export function isPaymentDisabled(): boolean {
  // Check environment variable first (for build-time configuration)
  const envDisabled = import.meta.env.VITE_DISABLE_PAYMENTS === 'true';
  if (envDisabled) {
    return true;
  }

  // Check if running on iOS
  return isIOS();
}

/**
 * Get the API base URL, handling both web and native environments
 * In native, you may want to use a different URL or read from Capacitor config
 */
export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // If VITE_API_BASE_URL is set (including empty string), use it
  // Empty string means use relative URLs (useful for Docker/Nginx proxy)
  if (envUrl !== undefined) {
    return envUrl;
  }

  if (isCapacitor()) {
    // Try api.openathlete.org first, fallback to openathlete.org
    // You can override this with VITE_API_BASE_URL environment variable
    return 'https://api.openathlete.org';
  }

  return 'http://localhost:3000';
}
