async function fetchPixabayAPI(query, page) {
  const response = await fetch(
    `https://pixabay.com/api/?key=23604393-9751c4fdb7943747aa1d7afad&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  if (response.ok) {
    const images = await response.json();
    return images.hits;
  }
  return await Promise.reject(
    new Error(`No image with query "${query}" found.`),
  );
}

export default fetchPixabayAPI;
