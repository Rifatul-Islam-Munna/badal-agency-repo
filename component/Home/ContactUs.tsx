"use client";

import { Paperclip } from "lucide-react";
import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    projectDetails: "",
    attachment: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className=" mt-13">
      <div className="border border-t-2 border-l-0 border-r-0 border-b-0 border-text-blue/20 bg-white">
        <div className="flex flex-col lg:flex-row gap-52 max-w-7xl pt-25  mx-auto w-full justify-between ">
          {/* Left Section - Heading */}
          <div className="w-full lg:w-auto mb-8 lg:mb-0">
            <h2 className="text-[28px] font-normal leading-snug text-[#05364a] ">
              Have a project?
              <br />
              Share Your Project
              <br />
              with Us
            </h2>
          </div>

          {/* Right Section - Form */}
          <div className="flex-1 w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#dfdfdf] rounded-[20px] p-8"
            >
              {/* Name and Email Row */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#05364a] text-xl font-normal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border bg-bg-light/60 border-[#dfdfdf] focus:outline-none focus:border-[#05364a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#05364a] text-xl font-normal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#dfdfdf] bg-bg-light/60 focus:outline-none focus:border-[#05364a] transition-colors"
                  />
                </div>
              </div>

              {/* Budget Field */}
              <div className="mb-6">
                <label className="block text-[#05364a] text-xl font-normal mb-2">
                  My budget
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border bg-bg-light/60 border-[#dfdfdf] focus:outline-none focus:border-[#05364a] transition-colors pr-20"
                  />
                  <span className="absolute border-l h-full border-2 border-r-0 flex justify-center items-center border-t-0 border-b-0 pl-10 right-4 top-1/2 -translate-y-1/2 text-[#05364a] text-xl font-normal">
                    USD($)
                  </span>
                </div>
              </div>

              {/* Attachment Field */}
              <div className="mb-6">
                <label className="block text-[#05364a] text-xl font-normal mb-2">
                  Attachment example
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 w-full px-4 py-3 border bg-bg-light/60 border-[#dfdfdf] cursor-pointer hover:bg-[#dfdfdf]/30 transition-colors"
                  >
                    <Paperclip className="text-text-blue" />
                    <span className="text-[#05364a] text-xl font-normal">
                      {formData.attachment
                        ? formData.attachment.name
                        : "Attach File"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Project Details Textarea */}
              <div className="mb-6">
                <label className="block text-[#05364a] text-xl font-normal mb-2">
                  Write your Project details or thought
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border bg-bg-light/60 border-[#dfdfdf] focus:outline-none focus:border-[#05364a] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#98c73d] hover:bg-[#88b72d] text-xl text-white font-medium px-20 py-3 rounded-full transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectForm;
