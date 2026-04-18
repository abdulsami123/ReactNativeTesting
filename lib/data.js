// lib/data.js

/** @type {import('./types').Job[]} */
export const FAKE_JOBS = [
  {
    id: "job_001",
    address: "14 Maple Street",
    suburb: "Surry Hills",
    date: "2026-04-22",
    time: "09:00 - 11:00",
    rooms: 2,
    bathrooms: 1,
    payRate: 35,
    status: "available",
    notes: "Client has a cat. Please vacuum thoroughly.",
  },
  {
    id: "job_002",
    address: "87 Ocean Drive",
    suburb: "Bondi",
    date: "2026-04-22",
    time: "13:00 - 16:00",
    rooms: 3,
    bathrooms: 2,
    payRate: 40,
    status: "available",
    notes: "Focus on kitchen and bathrooms.",
  },
  {
    id: "job_003",
    address: "3 Park Lane",
    suburb: "Newtown",
    date: "2026-04-23",
    time: "08:00 - 10:00",
    rooms: 1,
    bathrooms: 1,
    payRate: 30,
    status: "available",
  },
  {
    id: "job_004",
    address: "210 George Street",
    suburb: "CBD",
    date: "2026-04-23",
    time: "11:00 - 14:00",
    rooms: 4,
    bathrooms: 2,
    payRate: 45,
    status: "available",
    notes: "Large apartment, lift access available.",
  },
  {
    id: "job_005",
    address: "55 Victoria Road",
    suburb: "Marrickville",
    date: "2026-04-24",
    time: "10:00 - 12:00",
    rooms: 2,
    bathrooms: 1,
    payRate: 35,
    status: "available",
  },
  {
    id: "job_006",
    address: "9 Harbour View Terrace",
    suburb: "Pyrmont",
    date: "2026-04-25",
    time: "09:00 - 13:00",
    rooms: 5,
    bathrooms: 3,
    payRate: 50,
    status: "available",
    notes: "End of lease clean. Very thorough job required.",
  },
]

/**
 * Helper — get a job by id
 * @param {string} id
 * @returns {import('./types').Job | undefined}
 */
export const getJobById = (id) => FAKE_JOBS.find((j) => j.id === id)