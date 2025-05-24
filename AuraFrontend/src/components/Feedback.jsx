import React from 'react';

const Feedback = () => {
  return (
    <section className="bg-black text-white p-10 flex flex-col md:flex-row justify-between gap-10">
      <div className="text-3xl font-light">
        <p>Give Us</p>
        <p>Your</p>
        <p>Precious</p>
        <p>Feedback</p>
      </div>
      <form className="bg-[#8D6E70] p-6 rounded-md space-y-4 w-full max-w-md">
        <div className="flex gap-4">
          <input className="w-1/2 p-2" placeholder="First Name" />
          <input className="w-1/2 p-2" placeholder="Surname" />
        </div>
        <div className="flex gap-4">
          <input className="w-1/2 p-2" placeholder="Contact No." />
          <input className="w-1/2 p-2" placeholder="Email Id" />
        </div>
        <textarea className="w-full p-2 h-24" placeholder="Feedback" />
        <button type="submit" className="bg-white text-black px-4 py-2 border hover:bg-black hover:text-white transition">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Feedback;
