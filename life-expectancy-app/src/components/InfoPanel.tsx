'use client';

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

/**
 * InfoPanel
 *
 * Floating info button that opens an overlay with project details:
 * - Button: fixed at bottom-right, toggles open state
 * - Overlay: semi-transparent backdrop; click outside or on X to close
 * - Content: project overview, GitHub link, developer profiles, feedback survey
 */
export default function InfoPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating “info” button, fixed bottom-right */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          bg-white/90 p-3 rounded-full shadow-lg
          hover:shadow-2xl transition-shadow
        "
        aria-label="About this project"
      >
        <Info size={24} className="text-blue-600" />
      </button>

      {/* Overlay panel */}
      {open && (
        <div
          className="
            fixed inset-0 z-40 
            bg-black/50
            flex items-center justify-center
            px-4
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="
              relative bg-white rounded-2xl shadow-2xl
              max-w-lg w-full p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="
                absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100
                transition-colors
              "
              aria-label="Close"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">About This Project</h2>

            <p className="mb-4 text-gray-700">
              This Life Expectancy Calculator leverages an XGBoost model trained on a synthetically
              generated, yet realistically modeled dataset derived from existing public health
              surveys. By completing four quick sections—Personal Info, Lifestyle, Medical History,
              and Preventive Care—you’ll receive your personalized life expectancy estimate.
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Research Data & Code</h3>
              <p className="text-gray-700 mb-2">
                All of our underlying research—from synthetic dataset generation to model training—
                is publicly available on GitHub:
              </p>
              <a
                href="https://github.com/mahersalman/life-expectancy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:underline font-medium"
              >
                github.com/mahersalman/life-expectancy
              </a>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Developers</h3>
              <ul className="list-none text-gray-700 space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/maher-salman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Maher Salman
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/adan-butto-659288232/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Adan Butto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">We Value Your Feedback</h3>
              <p className="text-gray-700 mb-2">
                Help us improve by filling out this quick SUS survey:
              </p>
              <a
                href="https://forms.gle/NZYTfYG1NNxBjqAG6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-colors font-medium"
              >
                Give Feedback
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
