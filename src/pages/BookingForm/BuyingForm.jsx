import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../components/Shared/Container';
import bookingImg from '../../assets//images/BookingImage.png'
import Button from '../../components/Shared/Button/Button';
import { useLocation, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const BuyingForm = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const location = useLocation();

  const managerEmail = location.state?.managerEmail;

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure(`/product/${id}`);
      return res.data;
    }
  })
  const { _id, quantity, moq } = product || {};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (product?._id) {
      setValue('buyerEmail', user.user?.email)
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('paymentMethod', product.paymentMethod)
    }
  }, [product, setValue, user]);

  const orderQuantity = watch("orderQuantity");
  const unitPrice = watch("price");

  useEffect(() => {
    if (orderQuantity && unitPrice) {
      const totalPrice = orderQuantity * unitPrice;
      setValue("orderPrice", totalPrice);
    } else {
      setValue("orderPrice", 0);
    }
  }, [orderQuantity, unitPrice, setValue]);


  const onSubmit = async (data, event) => {
    const actionType = event?.nativeEvent?.submitter?.value;
    if (!product?._id) {
      toast.error("Product ID missing!");
      return;
    }

    if (actionType === "cod") {
      console.log("COD Order:", data);

      try {
        const response = await axiosSecure.post("/orders", {
          ...data,
          productId: product._id,
          paymentMethod: product.paymentMethod,
          paymentStatus: "pending",
          managerEmail: managerEmail,
        });

        console.log(response.data);

        if (response.data.insertedId) {
          toast.success('Order Successfully Done.');
          reset();
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";

        if (error.response?.status === 409) {
          toast.error(errorMessage);
        } else {
          toast.error("Failed to place order. Please try again.");
        }
        console.error("Order Error:", error);
      }
    }
    // else if (actionType === "Stripe")

  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-[5%]'
        >

          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 my-8">
            <div>
              <h4 className="text-3xl font-semibold mb-5">Buying Information</h4>
              <fieldset className="fieldset text-black text-base font-semibold">

                {/* email */}
                <label className="label mt-4 text-black">Email</label>
                <input
                  type="email"
                  {...register("buyerEmail")}
                  className="input w-full font-normal bg-gray-100 cursor-not-allowed"
                  readOnly
                  placeholder="Your Email"
                />

                {/* Product name */}
                <label className="label text-black mt-4">Product Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="input w-full font-normal cursor-not-allowed"
                  readOnly
                  placeholder="Product Name"
                />

                <div className='flex flex-row gap-8'>
                  <div className='flex-1'>
                    {/* price */}
                    <label className="label mt-4 text-black">Price</label>
                    <input
                      type="number"
                      {...register('price')}
                      className="input w-full font-normal mt-2 cursor-not-allowed"
                      readOnly
                      placeholder="Price"
                    />
                  </div>

                  <div className='flex-1'>
                    <label className="label mt-4 text-black">Payment Options</label>
                    <select {...register("paymentMethod")} defaultValue="Choose payment option" className="select mt-2 w-full cursor-not-allowed text-black" disabled>
                      <option value='Cash on Delivery'>Cash on Delivery</option>
                      <option value='Stripe'>Stripe</option>
                    </select>
                  </div>
                </div>

                {/* Full name */}
                <label className="label text-black mt-4">Full Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="input font-normal w-full"
                  placeholder="Your Name"
                />

                <div className='flex flex-row gap-8'>
                  <div>
                    <label className="label mt-4 text-black">Order Quantity</label>
                    <input
                      type="number"
                      {...register("orderQuantity", {
                        required: "Order quantity is required",
                        valueAsNumber: true,
                        validate: (value) => {
                          if (value < moq) {
                            return `Minimum order quantity is ${moq}`;
                          }
                          if (value > quantity) {
                            return `Only ${quantity} items available in stock`;
                          }
                          return true;
                        },
                      })}
                      className="input w-full font-normal mt-2"
                      placeholder="Order Quantity"
                    />
                    {
                      errors.orderQuantity && <p className='text-red-500 text-xs mt-1'>{errors.orderQuantity.message}</p>
                    }
                  </div>
                  <div>
                    <label className="label mt-4 text-black">Order Price</label>
                    <input
                      type="number"
                      {...register("orderPrice")}
                      className="input w-full font-normal mt-2"
                      placeholder="Order Price"
                      readOnly
                    />
                  </div>
                </div>

                {/* phone */}
                <label className="label mt-4 text-black">Phone No</label>
                <input
                  type="number"
                  {...register("phone")}
                  className="input w-full font-normal"
                  placeholder="Your Phone No"
                />

                {/* address */}
                <label className="label mt-4 text-black">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input w-full font-normal"
                  placeholder="Your Address"
                />

                <label className="label mt-4 text-black">Additional Notes</label>
                <textarea
                  {...register('additionalNotes')}
                  placeholder="Additional Notes......."
                  className="textarea textarea-neutral w-full mb-6"></textarea>

                {product?.paymentMethod === 'Cash on Delivery' && (
                  <Button
                    type="submit"
                    value="cod"
                    label="Purchase"
                  />
                )}

                {product?.paymentMethod === 'Stripe' && (
                  <Button
                    type="submit"
                    value="Stripe"
                    label="Stripe"
                  />
                )}
              </fieldset>
            </div>

            {/* Image */}
            <div className='m-auto'>
              <img className='w-[80%] m-auto' src={bookingImg} alt="" />
            </div>
          </div>
        </form>

      </Container>
    </div>
  );
};

export default BuyingForm;