import { getHeaders, getBaseUrl } from "./config";

/** 
const headers = await getHeaders();
const API_BASE_URL = await getBaseUrl();
*/
const headers = getHeaders();
const API_BASE_URL = getBaseUrl();

export async function search(params) {
  const url = API_BASE_URL + "/search";
  const query = new URLSearchParams(params);
  try {
    const response = await fetch(`${url}?${query}`, headers);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getSongUrl(id) {
  const url = `${API_BASE_URL}/song/url?id=${id}`;
  const response = await fetch(url, headers);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
