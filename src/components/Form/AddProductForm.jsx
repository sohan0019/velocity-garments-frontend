import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../Utils';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const AddProductForm = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 1. TanStack Mutation
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (productData) => {
      const { data } = await axiosSecure.post('/products', productData);
      return data;
    },
    onSuccess: () => {
      toast.success('Product added successfully.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      setImages([]);
      setPreviews([]);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add product.');
    },
  });

  // 2. React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
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

  // 4. Check status correctly
  const { data: dbUser = {} } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  // FIX: Comparison logic
  const isSuspended = dbUser?.status === 'Suspend';
  const isPendingUser = dbUser?.status === 'Pending';
  const isDisabled = isSuspended || isPendingUser;

  // 5. Form Submission
  const onSubmit = async (data) => {
    if (isDisabled) return toast.error("Action not allowed for your account status.");

    let imageURLs = [];
    try {
      const uploadPromises = images.map(img => imageUpload(img));
      imageURLs = await Promise.all(uploadPromises);
    } catch {
      return toast.error('Failed to upload images.');
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-full lg:w-3/4 min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 py-10 px-6 mx-auto'>
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
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>

            <div className='space-y-1 text-sm flex gap-5'>
              <div className='flex-1'>
                <label className='block text-gray-600 font-semibold'>Category</label>
                <select
                  className='w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value='Shirt'>Shirt</option>
                  <option value='Pant'>Pant</option>
                  <option value='Jacket'>Jacket</option>
                  <option value='Tops'>Tops</option>
                  <option value='Shari'>Shari</option>
                  <option value='Accessories'>Accessories</option>
                </select>
              </div>
              <div className='space-y-1 text-sm flex-1'>
                <label className='block text-gray-600 font-semibold'>MOQ</label>
                <input
                  className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white'
                  type='number'
                  {...register('moq', { required: 'Enter moq', min: 1 })}
                />
              </div>
            </div>

            <div className='space-y-1 text-sm'>
              <label className='block text-gray-600 font-semibold'>Description</label>
              <textarea
                className={`block rounded-md w-full h-32 px-4 py-3 border bg-white focus:outline-lime-500 ${errors.description ? 'border-red-500' : 'border-lime-300'}`}
                {...register('description', { required: 'Description is required' })}
              ></textarea>
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
              </div>
              <div className='space-y-1 text-sm'>
                <label className='block text-gray-600 font-semibold'>Quantity</label>
                <input
                  className='w-full px-4 py-3 border border-lime-300 rounded-md bg-white'
                  type='number'
                  {...register('quantity', { required: 'Enter quantity', min: 1 })}
                />
              </div>
            </div>

            <div className='text-sm space-y-1'>
              <label className='block text-gray-600 font-semibold'>Payment Method</label>
                <select
                  className='w-full px-4 py-3 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  {...register('paymentMethod', { required: 'Payment Method is required' })}
                >
                  <option value='Cash on Delivery'>Cash On Delivery</option>
                  <option value='Stripe'>Stripe</option>
                </select>
            </div>

            {/* Image Upload Area */}
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

            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                id="showOnHome"
                className='w-4 h-4 accent-lime-500 cursor-pointer'
                {...register('showOnHome')}
              />
              <label htmlFor="showOnHome" className='text-sm text-gray-600 font-semibold cursor-pointer'>
                Show on Homepage
              </label>
            </div>

            <button
              disabled={isPending || isDisabled}
              type='submit'
              className={`w-full p-3 mt-auto font-bold text-white rounded shadow-md transition 
                ${isDisabled ? 'bg-red-400 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600 cursor-pointer'} 
              disabled:bg-gray-400`}
            >
              {isPending ? 'Saving...' : isDisabled ? 'Access Restricted' : 'Save & Create Product'}
            </button>

            {isSuspended && (
              <p className="text-red-500 text-xs mt-2 text-center font-medium">
                You cannot add products because your account is suspended.
              </p>
            )}
            {isPendingUser && (
              <p className="text-orange-500 text-xs mt-2 text-center font-medium">
                You cannot add products because your account is pending approval.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;