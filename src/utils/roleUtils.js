/**
 * Utility functions for handling user roles
 */

/**
 * Check if user has admin privileges
 * @param {Object} roleData - User role data from API
 * @returns {boolean} True if user is admin or staff
 */
export const hasAdminAccess = (roleData) => {
  if (!roleData) return false;
  return roleData.is_admin || roleData.is_staff;
};

/**
 * Check if user is admin (not staff)
 * @param {Object} roleData - User role data from API
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (roleData) => {
  if (!roleData) return false;
  return roleData.is_admin;
};

/**
 * Check if user is staff (not admin)
 * @param {Object} roleData - User role data from API
 * @returns {boolean} True if user is staff
 */
export const isStaff = (roleData) => {
  if (!roleData) return false;
  return roleData.is_staff && !roleData.is_admin;
};

/**
 * Check if user is customer
 * @param {Object} roleData - User role data from API
 * @returns {boolean} True if user is customer
 */
export const isCustomer = (roleData) => {
  if (!roleData) return false;
  return roleData.is_customer;
};

/**
 * Get appropriate redirect path based on user role
 * @param {Object} roleData - User role data from API
 * @returns {string} Redirect path
 */
export const getRedirectPath = (roleData) => {
  if (isAdmin(roleData)) {
    // Admin users will be redirected to external admin panel (handled separately)
    return "/";
  } else if (isStaff(roleData)) {
    // Staff users go to internal admin panel
    return "/admin";
  } else if (isCustomer(roleData)) {
    return "/";
  } else {
    // Default to home page for undefined roles
    return "/";
  }
};

/**
 * Get user role display name
 * @param {Object} roleData - User role data from API
 * @returns {string} Role display name
 */
export const getRoleDisplayName = (roleData) => {
  if (!roleData) return "Không xác định";

  // Admin has higher priority than staff
  if (roleData.is_admin) return "Quản trị viên";
  if (roleData.is_staff) return "Nhân viên";
  if (roleData.is_customer) return "Khách hàng";

  return "Không xác định";
};
