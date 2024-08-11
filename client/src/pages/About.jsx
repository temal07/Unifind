import React, { useState } from 'react';

export default function About() {
  // State to track which question is open
  const [openQuestion, setOpenQuestion] = useState(null);

  // Function to toggle question visibility
  const toggleQuestion = (questionIndex) => {
    if (openQuestion === questionIndex) {
      setOpenQuestion(null); // Close the question if it's already open
    } else {
      setOpenQuestion(questionIndex); // Open the selected question
    }
  };

  return (
    <div className="flex flex-col gap-10 ml-52">
      <div className="flex justify-center mt-10">
        <h1 className="font-poppins font-semibold text-4xl bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 text-transparent bg-clip-text">
          Unifind: A place specialized in University decisions.
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-poppins font-semibold">Unifind's Mission is simple:</p>
        <div className="">
          <p className="flex justify-center font-radio-canada-big text-xl">
            We believe that by this beneficial usage of AI, not only graduates, but all high school students
            will be able to explore this useful application and gain insight about the universities they might 
            apply to in the future.
          </p>
        </div>
        <p className="text-2xl font-poppins font-semibold">MAQ: May Asked Questions:</p>
        <div className="">
          <ul className="">
            <li>
              <div className="flex items-center">
                <button onClick={() => toggleQuestion(1)} className="focus:outline-none mr-2">
                  {openQuestion === 1 ? '−' : '+'} {/* Toggle between plus and minus */}
                </button>
                <span className="font-bold text-2xl">Why Unifind?</span>
              </div>
              {openQuestion === 1 && (
                <p className="ml-6 mt-2 max-w-2xl">
                  Unifind helps you explore universities 
                  with AI-generated insights to guide your decision-making process.
                  We created Unifind because we believed that no one has used AI (models)
                  to help students with their college decisions and thought it was a good use-case
                  of AI to capitalize upon. Keep in mind, Gemini WILL NOT interfere with your actual college application, it's
                  just going to act as a tool for guidance.
                </p>
              )}
            </li>
            <li>
              <div className="flex items-center mt-4">
                <button onClick={() => toggleQuestion(2)} className="focus:outline-none mr-2">
                  {openQuestion === 2 ? '−' : '+'} {/* Toggle between plus and minus */}
                </button>
                <span className="font-bold text-2xl">How does the AI in Unifind benefit the decision process?</span>
              </div>
              {openQuestion === 2 && (
                <p className="ml-6 mt-2 max-w-2xl">
                  Gemini, the AI Model used in this project, will analyze the data
                  provided by the user and it will make decisions using the data. Finally
                  it will recommend universities based on the data.
                </p>
              )}
            </li>
            <li>
              <div className="flex items-center mt-4">
                <button onClick={() => toggleQuestion(3)} className="focus:outline-none mr-2">
                  {openQuestion === 3 ? '−' : '+'} {/* Toggle between plus and minus */}
                </button>
                <span className="font-bold text-2xl">How does Unifind exactly work?</span>
              </div>
              {openQuestion === 3 && (
                <>
                  <p className="ml-6 mt-2 max-w-2xl">
                    Here is how exactly Unifind works: 
                  </p>
                  <ul className='list-disc pl-20'>
                      <li>Users are greeted with a welcome page when they first visit the website</li>
                      <li>Users create an account/sign into their account</li>
                      <li>The home page greets them with a call to action cards</li>
                      <li>Users can search universities and gain insight about them. Unifind currently contains 172 universities</li>
                      <li>Users can search up other users and get to know them. Users will not be able to edit other user's profiles</li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
