import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // page reload stop

    console.log("Contact Form Data 👇");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Message:", formData.message);

    // optional: form clear
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Get in Touch with{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Zaptro
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Info</h2>
            <p className="text-gray-300 leading-relaxed">
              Have a question or need support? We're here to help you with your
              electronics journey.
            </p>

            <div className="space-y-5">
              <p>📍 123 Tech Lane, Punjab, Pakistan</p>
              <p>📧 dawood.shahzad8292@gmail.com</p>
              <p>📞 +92 321 7454974</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white text-black outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white text-black outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Your Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-xl bg-white/20 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 font-semibold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;