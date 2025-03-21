import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const { addProductMutation } = useProducts();

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
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProductMutation.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess('성공적으로 제품이 추가되었습니다.');
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // 메모리 해제
      }
    };
  }, [previewUrl]);

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>✅{success}</p>}

      {file && <img className='w-96 mx-auto mb-2' src={previewUrl} alt='local file' />}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        <input type='text' name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange} />
        <input type='number' name='price' value={product.price ?? ''} placeholder='가격' required onChange={handleChange} />
        <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' required onChange={handleChange} />
        <input type='text' name='description' value={product.description ?? ''} placeholder='제품 설명' required onChange={handleChange} />
        <input type='text' name='options' value={product.options ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange} />
        <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
