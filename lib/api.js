// lib/api.js

const FAKE_RESPONSES = [
  {
    passed: true,
    feedback: "Great work! All rooms are clean and well presented.",
  },
  {
    passed: true,
    feedback: "Job completed successfully. Kitchen and bathrooms are spotless.",
  },
  {
    passed: false,
    feedback: "Bathroom not cleaned thoroughly. Please re-check behind the toilet and the shower screen.",
  },
  {
    passed: false,
    feedback: "Living room carpet still has visible dirt. Please re-vacuum and resubmit.",
  },
]

/**
 * Simulates sending photos to the backend for verification.
 * Returns a pass/fail result with feedback.
 *
 * @param {string} bookingId
 * @param {string[]} photoUris
 * @returns {Promise<{ passed: boolean, feedback: string }>}
 */
export const submitJobPhotos = async (bookingId, photoUris) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Randomly pick a fake response
  const response = FAKE_RESPONSES[Math.floor(Math.random() * FAKE_RESPONSES.length)]

  return response
}