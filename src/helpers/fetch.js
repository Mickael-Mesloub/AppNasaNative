export const GET = async url => {
  const response = await fetch(url, {method: 'GET'});

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
