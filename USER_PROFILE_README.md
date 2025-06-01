# User Profile Feature - GearShop

## Overview
The User Profile feature provides authenticated users with a comprehensive profile management system including personal information display, profile editing, order history, and password management.

## Features

### 1. Profile Information Display (`UserProfileInfo.js`)
- **User Details**: Displays username, email, full name, phone, and address
- **Account Status**: Shows account creation date and last login
- **Responsive Design**: Adapts to different screen sizes
- **Icons**: Uses Bootstrap Icons for visual clarity

### 2. Profile Editing (`UserProfileEdit.js`)
- **Editable Fields**: First name, last name, phone, and address
- **Form Validation**: Client-side validation with error messages
- **Success Feedback**: Shows confirmation when profile is updated
- **Loading States**: Displays loading spinner during updates
- **Vietnamese Localization**: All messages in Vietnamese

### 3. Order History (`UserOrderHistory.js`)
- **Order Listing**: Displays all user orders with pagination
- **Order Details**: Shows order ID, date, total, payment method, and status
- **Status Badges**: Color-coded status indicators
- **Order Details Modal**: View detailed order information
- **Refresh Functionality**: Manual refresh option for order updates

### 4. Password Management (`UserPasswordChange.js`)
- **Secure Password Change**: Current password verification
- **Password Validation**: Minimum length and confirmation matching
- **Error Handling**: Specific error messages for different scenarios
- **Success Confirmation**: Clear feedback on successful password change
- **Security Notes**: Guidelines for password requirements

## Technical Implementation

### API Integration
- **Authentication**: Uses Bearer token from localStorage
- **Error Handling**: Comprehensive error handling for API failures
- **Token Validation**: Checks for valid authentication tokens

### State Management
- **Custom Hooks**: `useUserProfile` and `useUserOrders` for data management
- **Redux Integration**: Integrates with existing auth state
- **Local State**: Component-level state for forms and UI

### UI/UX Design
- **Bootstrap Components**: Consistent with existing design system
- **Responsive Layout**: Mobile-first responsive design
- **Tab Navigation**: Easy switching between profile sections
- **Loading States**: Visual feedback during data operations
- **Error States**: Clear error messages and recovery options

### Styling
- **SCSS Styling**: Custom styles in `UserProfile.scss`
- **Bootstrap Integration**: Leverages existing Bootstrap theme
- **Animation Effects**: Smooth transitions and hover effects
- **Mobile Optimization**: Responsive design for all devices

## File Structure
```
components/UserProfile/
├── UserProfile.js              # Main container component
├── UserProfileInfo.js          # Profile information display
├── UserProfileEdit.js          # Profile editing form
├── UserOrderHistory.js         # Order history and details
├── UserPasswordChange.js       # Password change functionality
└── UserProfile.scss           # Custom styles

services/
└── userService.js             # API service functions

hook/
└── useUserProfile.js          # Custom hooks for profile data
```

## API Endpoints
- `GET /user/profile/` - Get user profile information
- `PATCH /user/profile/` - Update user profile
- `GET /user/orders/` - Get user order history
- `GET /user/orders/{id}/` - Get specific order details
- `PATCH /user/change-password/` - Change user password

## Usage

### Navigation
Users can access their profile through:
1. **Header Dropdown**: Click on user name in header → "Thông tin cá nhân"
2. **Direct URL**: Navigate to `/profile` (protected route)

### Profile Management
1. **View Profile**: Default tab shows current profile information
2. **Edit Profile**: Switch to "Chỉnh sửa" tab to update information
3. **Order History**: View all orders in "Lịch sử đặt hàng" tab
4. **Change Password**: Secure password updates in "Đổi mật khẩu" tab

## Security Features
- **Protected Routes**: Requires authentication to access
- **Token Validation**: Checks token validity before API calls
- **Password Security**: Current password verification for changes
- **Error Handling**: Secure error messages without sensitive data exposure

## Future Enhancements
- Profile picture upload
- Email change with verification
- Two-factor authentication
- Account deletion functionality
- Export order history
- Notification preferences

## Dependencies
- React Bootstrap for UI components
- Axios for API requests
- React Router for navigation
- Redux for state management
- Bootstrap Icons for iconography
