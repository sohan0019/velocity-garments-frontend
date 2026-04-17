import React from 'react';
import toast from 'react-hot-toast';
import { Form } from 'react-router';
import Container from '../Shared/Container';

const GetConnected = () => {

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name;
    const email = form.elements.email;
    const emailInput = form.elements[1];

    if (!name || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!emailInput.checkValidity()) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thanks, We gonna reach you soon! 🎉");
    form.reset();
  };

  return (
    <section>
      <Container>
        <div className='flex md:flex-row flex-col gap-[5%] py-20 border-y bg-amber-50'>
          <div className='flex-1 flex justify-center items-center'>
            <h1 className='lg:text-3xl xs:text-3xl xxs:text-2xl text-xl xxs:font-medium font-semibold text-purple-950 text-center md:mb-0 mb-8'>WANNA GET CONNECTED WITH US?</h1>
          </div>

          <div className='flex-1 flex justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <Form onSubmit={handleFormSubmit} className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input type="text" name="name" className="input" placeholder="Name" required />
                  <label className="label">Email</label>
                  <input type="email" name="email" className="input" placeholder="Email" required />
                  <button type='submit' className="btn btn-neutral mt-4">Contact Now</button>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
};

export default GetConnected;