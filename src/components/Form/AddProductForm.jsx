import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../Utils';
import useAuth from '../../hooks/useAuth';

const AddProductForm = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const queryClient = useQueryClient();
  // 1. TanStack Mutation
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (productData) => {
      const { data } = await axiosSecure.post('/products', productData);   //
      return data;
    },
   onSuccess: () => {
  toast.success('Product added successfully.');
  queryClient.invalidateQueries({ queryKey: ['products'] });  //
  reset();
  setImages([]);
  setPreviews([]);
},
    onError: (error) => {
      toast.error(error.message || 'Failed to add product.');
    },
  });

  // 2. React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: 'Shirt',
      paymentMethod: 'Cash on Delivery',
      showOnHome: false,
    }
  });

  // 3. Image Handlers
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 4. Form Submission
  const onSubmit = async (data) => {
  let imageURLs = [];
  try {
    const uploadPromises = images.map(img => imageUpload(img));
    imageURLs = await Promise.all(uploadPromises);
  } catch {
    return toast.error('Failed to upload images to ImgBB.');
  }

  try {
    const productData = { 
      ...data, 
      images: imageURLs, 
      manager: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      }, 
    };
    await mutateAsync(productData);
  } catch {
    // This will now correctly show the CORS/Server error
    toast.error('Backend submission failed.'); 
  }
};

  return (
    <div className='w-full lg:w-3/4 min-h-screen flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 py-10 px-6 mx-auto'>
      <h2 className="text-2xl font-bold mb-6 text-lime-600">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

          {/* Left Column */}
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600 font-semibold'>Product Name</label>
              <input
                className={`w-full px-4 py-3 border rounded-md bg-white focus:outline-lime-500 ${errors.name ? 'border-red-500' : 'border-lime-300'}`}
                id='name'
                type='text'
                placeholder='Product Name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>

            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600 font-semibold'>Category</label>
              <select 
                className='w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                {...register('category', { required: 'Category is required' })}
              >
                <option disabled={true}>Pick a Category</option>
                <option value='Shirt'>Shirt</option>
                <option value='Pant'>Pant</option>
                <option value='Jacket'>Jacket</option>
                <option value='Tops'>Tops</option>
                <option value='Shari'>Shari</option>
                <option value='Accessories'>Accessories</option>
              </select>
              {errors.category && <p className='text-red-500 text-xs mt-1'>{errors.category.message}</p>}
            </div>

            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600 font-semibold'>Description</label>
              <textarea 
                className={`block rounded-md w-full h-32 px-4 py-3 border bg-white focus:outline-lime-500 ${errors.description ? 'border-red-500' : 'border-lime-300'}`}
                {...register('description', { required: 'Description is required' })}
              ></textarea>
              {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
            </div>

            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600 font-semibold'>Video Link (Optional)</label>
              <input 
                className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' 
                type='url' 
                {...register('videoLink')}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6 flex flex-col'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1 text-sm'>
                <label className='block text-gray-600 font-semibold'>Price</label>
                <input 
                  className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' 
                  type='number' 
                  {...register('price', { required: 'Price is required', min: 0 })}
                />
                {errors.price && <p className='text-red-500 text-xs mt-1'>{errors.price.message}</p>}
              </div>
              <div className='space-y-1 text-sm'>
                <label className='block text-gray-600 font-semibold'>Quantity</label>
                <input 
                  className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' 
                  type='number' 
                  {...register('quantity', { required: 'Enter quantity', min: 1 })}
                />
                {errors.quantity && <p className='text-red-500 text-xs mt-1'>{errors.quantity.message}</p>}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1 text-sm'>
                <label className='block text-gray-600 font-semibold'>Minimum Order (MOQ)</label>
                <input 
                  className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' 
                  type='number' 
                  {...register('moq', { required: 'Enter minimum order amount', min: 1 })}
                />
                {errors.moq && <p className='text-red-500 text-xs mt-1'>{errors.moq.message}</p>}
              </div>
              <div className='space-y-1 text-sm'>
                <label className='block text-gray-600 font-semibold'>Payment Options</label>
                <select className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white' {...register('paymentMethod', {required: true})}>
                  <option value='Cash on Delivery'>Cash on Delivery</option>
                  <option value='PayFirst'>PayFirst</option>
                </select>
              </div>
            </div>

            {/* Custom Image Upload */}
            <div className='p-4 w-full bg-white border-2 border-dotted border-lime-300 rounded-lg'>
              <div className='flex flex-col items-center'>
                <label className="cursor-pointer bg-lime-500 text-white px-4 py-2 rounded font-semibold hover:bg-lime-600 transition">
                  Select Images
                  <input onChange={handleImageChange} type='file' accept='image/*' multiple className='hidden' />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {previews.map((src, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img src={src} alt="preview" className="w-full h-full object-cover rounded-lg border border-lime-200" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <input type="checkbox" id="showOnHome" className="w-4 h-4 accent-lime-600" {...register('showOnHome')} />
              <label htmlFor="showOnHome" className="text-sm text-gray-600 font-semibold cursor-pointer">Show on Home Page</label>
            </div>

            <button 
              disabled={isPending}
              type='submit' 
              className='w-full p-3 mt-auto font-bold text-white rounded shadow-md bg-lime-500 hover:bg-lime-600 transition disabled:bg-gray-400'
            >
              {isPending ? 'Saving...' : 'Save & Create Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;