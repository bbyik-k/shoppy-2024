const url = process.env.REACT_APP_CLOUDINARY_URL;

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data.url);
}
