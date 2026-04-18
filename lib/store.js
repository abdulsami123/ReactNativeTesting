// lib/store.js
import { create } from "zustand"
import { FAKE_JOBS } from "./data"
import { submitJobPhotos } from "./api"

const useStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────

  /** @type {import('./types').Job[]} */
  jobs: FAKE_JOBS,

  /** @type {import('./types').Booking[]} */
  bookings: [],

  // ─── Job Actions ─────────────────────────────────────────

  /**
   * Book an available job. Marks it as booked in jobs list
   * and creates a booking entry.
   * @param {string} jobId
   */
  bookJob: (jobId) => {
    const existing = get().bookings.find((b) => b.jobId === jobId)
    if (existing) return // already booked

    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, status: "booked" } : j
      ),
      bookings: [
        ...state.bookings,
        {
          id: `booking_${Date.now()}`,
          jobId,
          bookedAt: new Date().toISOString(),
          status: "upcoming",
          submittedPhotos: [],
          feedback: null,
        },
      ],
    }))
  },

  /**
   * Cancel a booking. Returns the job to available.
   * @param {string} bookingId
   */
  cancelBooking: (bookingId) => {
    const booking = get().bookings.find((b) => b.id === bookingId)
    if (!booking) return

    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === booking.jobId ? { ...j, status: "available" } : j
      ),
      bookings: state.bookings.filter((b) => b.id !== bookingId),
    }))
  },

  /**
   * Submit photos for a booking. Calls fake API and stores result.
   * @param {string} bookingId
   * @param {string[]} photoUris
   * @returns {Promise<{ passed: boolean, feedback: string }>}
   */
  submitPhotos: async (bookingId, photoUris) => {
    // Mark as submitted while we wait
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: "submitted", submittedPhotos: photoUris }
          : b
      ),
    }))

    const result = await submitJobPhotos(bookingId, photoUris)

    // Update booking with result
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: result.passed ? "completed" : "rejected",
              feedback: result.feedback,
            }
          : b
      ),
      // If passed, mark the job as completed too
      jobs: state.jobs.map((j) => {
        const booking = state.bookings.find((b) => b.id === bookingId)
        return booking && j.id === booking.jobId && result.passed
          ? { ...j, status: "completed" }
          : j
      }),
    }))

    return result
  },

  // ─── Selectors ───────────────────────────────────────────

  /** Returns only available jobs */
  getAvailableJobs: () => get().jobs.filter((j) => j.status === "available"),

  /** Returns a booking with its full job details attached */
  getBookingWithJob: (bookingId) => {
    const booking = get().bookings.find((b) => b.id === bookingId)
    if (!booking) return null
    const job = get().jobs.find((j) => j.id === booking.jobId)
    return { ...booking, job }
  },
}))

export default useStore