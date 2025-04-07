import React, { useState } from "react";
import { Mail, PhoneCall } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been sent!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Contact</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="mb-6 flex items-center gap-4">
            <PhoneCall className="text-red-500" size={24} />
            <div>
              <h3 className="font-bold">Call To Us</h3>
              <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
              <p className="font-semibold text-gray-800">Phone: +8801611112222</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-red-500" size={24} />
            <div>
              <h3 className="font-bold">Write To Us</h3>
              <p className="text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
              <p className="font-semibold text-gray-800">customer@exclusive.com</p>
              <p className="font-semibold text-gray-800">support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white shadow-md p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
                className="input input-bordered w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                required
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone *"
                required
                className="input input-bordered w-full"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="textarea textarea-bordered w-full h-32"
            ></textarea>
            <button type="submit" className="btn btn-error text-white">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


