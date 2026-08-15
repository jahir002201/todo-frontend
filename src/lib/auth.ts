import { TokenResponse } from "./api";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export function saveTokens(tokens: TokenResponse) {
  localStorage.setItem(
    ACCESS_TOKEN,
    tokens.access_token
  );

  localStorage.setItem(
    REFRESH_TOKEN,
    tokens.refresh_token
  );
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(REFRESH_TOKEN);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export function isLoggedIn() {
  return Boolean(getAccessToken());
}