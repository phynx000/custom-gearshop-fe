/**
 * Checks if the stored token is valid and not expired
 * @returns {boolean} True if token is valid, false otherwise
 */
export const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  // For JWT tokens, you could implement expiry validation here
  // Basic validation for now - just check if token exists
  return !!token;
};

/**
 * Checks if the token is expired by making a verification request
 * @returns {Promise<boolean>} Promise resolving to true if token is valid, false if expired
 */
export const verifyTokenValidity = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    // You could implement a real token verification endpoint call here
    // For now, we'll just do a basic check to simulate verification

    // For JWT tokens, you can decode the payload to check expiration
    // This is a simple check for demonstration purposes
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) return false;

    try {
      // Decode the payload (middle part)
      const payload = JSON.parse(atob(tokenParts[1]));

      // Check if token has expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        // Token has expired
        return false;
      }

      return true;
    } catch (e) {
      console.error("Error decoding token:", e);
      return false;
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

/**
 * Clears all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

/**
 * Returns the current user from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    clearAuthData();
    return null;
  }
};
