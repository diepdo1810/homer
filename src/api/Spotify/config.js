/**
import { parse } from "yaml";

const fileName = "Spotify";

async function getConfig(path = "assets/config.yml") {
  const response = await fetch(path);
  if (response.status == 404 || response.redirected) {
    this.configNotFound = true;
    return {};
  }
  if (!response.ok) {
    throw Error(`${response.statusText}: ${response.body}`);
  }
  const body = await response.text();
  const config = parse(body, { merge: true });
  if (!config.api) {
    throw Error("API configuration is missing");
  }
  return config.api;
}

export async function getHeaders() {
  const config = await getConfig();
  return config.filter((item) => item.name === fileName)[0].headers || {};
}

export async function getBaseUrl() {
  const config = await getConfig();
  return config.filter((item) => item.name === fileName)[0].url || "";
}

export async function getItems() {
  const config = await getConfig();
  return config.filter((item) => item.name === fileName)[0].items || {};
}
 */
