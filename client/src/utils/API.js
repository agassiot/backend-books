

// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export function searchGoogleBooks(query) {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
