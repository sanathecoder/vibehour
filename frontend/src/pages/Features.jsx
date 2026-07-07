import React from 'react'

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="text-xl font-light uppercase mb-4">Quality Assurance</h3>
          <p className="text-gray-500 text-sm">Premium materials used in every VibeHour timepiece.</p>
        </div>
        <div>
          <h3 className="text-xl font-light uppercase mb-4">Secure Shipping</h3>
          <p className="text-gray-500 text-sm">We ensure safe and fast delivery to your doorstep.</p>
        </div>
        <div>
          <h3 className="text-xl font-light uppercase mb-4">24/7 Support</h3>
          <p className="text-gray-500 text-sm">Our team is always here to assist you with your queries.</p>
        </div>
      </div>
    </section>
  );
};

export default Features
