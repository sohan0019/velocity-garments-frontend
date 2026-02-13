import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { imageUpload } from '../../Utils';

const UpdateProductForm = ({ product, onUpdate }) => {
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: product,
  });

  // Reset form & load existing images
  useEffect(() => {
    if (product) {
      reset(product);
      if (product.images) {
        setExistingImages(product.images);
        setPreviews(product.images);
      }
    }
  }, [product, reset]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  // Handle new image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setNewImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      // 1. Upload new files to ImgBB and get URLs
      // We use Promise.all to upload all selected images simultaneously
      const uploadedUrls = await Promise.all(
        newImages.map((file) => imageUpload(file))
      );

      // 2. Combine the old URLs (that weren't deleted) with the brand new URLs
      const finalImages = [...existingImages, ...uploadedUrls];

      const finalData = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        moq: parseInt(data.moq),
        showOnHome: data.showOnHome,
        paymentMethod: data.paymentMethod,
        description: data.description,
        images: finalImages, // Now contains BOTH old and new
      };

      // 3. Send to your backend
      await onUpdate(product._id, finalData);

      toast.success('Product updated successfully!');
      setNewImages([]); // Clear local state after success
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-gray-800 rounded-xl p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
        <div className="space-y-6">

          {/* Name */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600 font-semibold">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Category & Price */}
          <div className="flex gap-2">
            <div className="w-1/2 space-y-1 text-sm">
              <label className="block text-gray-600 font-semibold">Category</label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              >
                <option disabled={true}>Pick a Category</option>
                <option value='Shirt'>Shirt</option>
                <option value='Pant'>Pant</option>
                <option value='Jacket'>Jacket</option>
                <option value='Tops'>Tops</option>
                <option value='Shari'>Shari</option>
                <option value='Accessories'>Accessories</option>
              </select>
            </div>

            <div className="w-1/2 space-y-1 text-sm">
              <label className="block text-gray-600 font-semibold">Price</label>
              <input
                {...register('price', { required: true })}
                type="number"
                className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              />
            </div>
          </div>

          {/* Quantity & MOQ */}
          <div className="flex gap-2">
            <div className="w-1/2 space-y-1 text-sm">
              <label className="block text-gray-600">Quantity</label>
              <input
                {...register('quantity', { required: true })}
                type="number"
                className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              />
            </div>

            <div className="w-1/2 space-y-1 text-sm">
              <label className="block text-gray-600">Minimum Order</label>
              <input
                {...register('moq', { required: true })}
                type="number"
                className="w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {/* Show on Home */}
            <div className="flex items-center gap-2 mt-3 flex-1">
              <input
                type="checkbox"
                {...register('showOnHome')}
                className="w-4 h-4 accent-lime-600"
              />
              <label className="text-sm text-gray-600 font-semibold">
                Show on Home Page
              </label>
            </div>

            <div className='space-y-1 text-sm flex-1'>
              <label className='block text-gray-600 font-semibold'>Payment Options</label>
              <select className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' {...register('paymentMethod', { required: true })}>
                <option value='Cash on Delivery'>Cash on Delivery</option>
                <option value='Stripe'>Stripe</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600 font-semibold">
              Description
            </label>
            <textarea
              {...register('description')}
              className="w-full h-32 px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
            />
          </div>

          {/* Images */}
          <div className="p-4 border-2 border-dotted border-gray-300 rounded-lg">
            <label className="block text-center cursor-pointer">
              <span className="bg-lime-500 text-white px-4 py-2 rounded font-semibold">
                Change Images
              </span>
              <input type="file" multiple hidden onChange={handleImageChange} />
            </label>

            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 font-medium text-white rounded bg-lime-500 hover:bg-lime-600 transition cursor-pointer"
          >
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
