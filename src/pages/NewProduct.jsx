import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const selectedFile = files ? files[0] : null;
      setFile(selectedFile);

      if (selectedFile) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
      }

      return;
    }
    setProduct((products) => ({ ...products, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      console.log(url);
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // 메모리 해제
      }
    };
  }, [previewUrl]);

  return (
    <section>
      {file && <img src={previewUrl} alt='local file' />}

      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        <input type='text' name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange} />
        <input type='number' name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange} />
        <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' required onChange={handleChange} />
        <input type='text' name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange} />
        <input type='text' name='options' value={product.options ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange} />
        <Button text={'제품 등록하기'} />
      </form>
    </section>
  );
}
