
import axios from "axios";

/**
 * Initializes the API Tracker middleware.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.apikey - The API key used to authenticate tracking requests.
 * @param {string} options.trackerUrl - The base URL of the tracker service.
 *
 * @returns {Function} Express middleware function that automatically logs API usage.
 *
 */
export function apiTracker({ apikey, trackerUrl }) {
  if (!apikey || !trackerUrl) {
    throw new Error("apiTracker requires both 'apikey' and 'trackerUrl'.");
  }

  return async function (req, res, next) {
    const startTime = Date.now();

    
    res.on("finish", async () => {
      const responseTime = Date.now() - startTime;

      try {
        // Send request data to tracker backend
        await axios.post(`${trackerUrl}/api/usage/log`, {
          apikey: apikey,
          endpoint: req.originalUrl,
          method: req.method,
          status_code: res.statusCode,
          is_success: res.statusCode >= 200 && res.statusCode < 400,
          response_time_ms: responseTime,
          ip: req.ip,
        });
      } catch (err) {
        console.error("[API Tracker] Logging failed:", err.message);
      }
    });

    next();
  };
}
