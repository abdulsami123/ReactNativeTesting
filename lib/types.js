// lib/types.js

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} address
 * @property {string} suburb
 * @property {string} date           - "2026-04-22"
 * @property {string} time           - "09:00 - 11:00"
 * @property {number} rooms
 * @property {number} bathrooms
 * @property {number} payRate        - per hour
 * @property {'available'|'booked'|'completed'|'rejected'} status
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} jobId
 * @property {string} bookedAt       - ISO string
 * @property {'upcoming'|'in_progress'|'submitted'|'completed'|'rejected'} status
 * @property {string[]} [submittedPhotos]   - local URIs
 * @property {string} [feedback]            - from backend
 */