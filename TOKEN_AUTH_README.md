# Token Authentication System Documentation

## Vấn đề ban đầu

Khi để ứng dụng qua đêm, token JWT đã hết hạn nhưng thông tin user vẫn còn trong localStorage/Redux state, gây ra tình trạng:
- Hiển thị tên đăng nhập
- Nhưng các API calls trả về lỗi 401 (Unauthorized)

## Giải pháp đã triển khai

### 1. Axios Interceptor (`src/services/apiClient.js`)

**Tính năng:**
- Tự động thêm Bearer token vào mọi request
- Xử lý response lỗi 401 (token expired)
- Tự động clear localStorage và redirect về login page
- Phát sự kiện custom để thông báo cho UI components

**Cách hoạt động:**
```javascript
// Request interceptor - thêm token vào header
config.headers.Authorization = `Bearer ${token}`;

// Response interceptor - xử lý 401 error
if (error.response.status === 401) {
  // Clear all auth data
  localStorage.clear();
  // Dispatch event to UI
  window.dispatchEvent(new CustomEvent('auth:logout'));
  // Redirect to login
  window.location.href = "/login";
}
```

### 2. Enhanced AuthProvider (`src/components/AuthProvider.js`)

**Cải tiến:**
- Kiểm tra token validity khi app khởi động
- Decode JWT token để check expiration time
- Tự động logout nếu token đã hết hạn

**Flow:**
1. App load → Check localStorage has token
2. If token exists → Verify expiration
3. If expired → Clear data + logout
4. If valid → Login user to Redux state

### 3. Token Validator Component (`src/components/TokenValidator.js`)

**Tính năng:**
- Kiểm tra token validity định kỳ (mỗi 5 phút)
- Hiển thị thông báo khi token hết hạn
- Lắng nghe sự kiện từ apiClient
- Tự động logout user

**UI:**
- Alert thông báo "Phiên đăng nhập đã hết hạn"
- Tự động ẩn sau 5 giây
- Position fixed ở góc trên phải

### 4. Updated Services

**Các service đã cập nhật:**
- `cartService.js` - Sử dụng apiClient thay vì axios trực tiếp
- `userService.js` - Loại bỏ manual token handling

**Lợi ích:**
- Code cleaner, ít duplicate
- Centralized error handling
- Consistent authentication behavior

## Cách sử dụng

### Kiểm tra trạng thái authentication:
```javascript
import { isTokenValid, verifyTokenValidity } from '../utils/auth';

// Quick check (chỉ check tồn tại token)
const hasToken = isTokenValid();

// Full verification (decode JWT và check expiration)
const isValid = await verifyTokenValidity();
```

### Sử dụng apiClient trong services:
```javascript
import apiClient from './apiClient';

// Thay vì:
const response = await axios.get(`${BASE_API_URL}/endpoint`, {
  headers: { Authorization: `Bearer ${token}` }
});

// Sử dụng:
const response = await apiClient.get('/endpoint');
```

## Debugging

### Event listeners để debug:
```javascript
// Listen for auth events
window.addEventListener('auth:logout', (event) => {
  console.log('User logged out:', event.detail);
});

window.addEventListener('auth:show-expired-message', () => {
  console.log('Token expired message shown');
});
```

### Console logs:
- `Token expired or invalid. Clearing authentication data.`
- `Token has expired during session. Logging out user.`
- `Token expired on app load. Logging out user.`

## Flow hoàn chỉnh

### Scenario 1: User để app qua đêm
1. User mở app → AuthProvider check token
2. Token expired → Clear localStorage + dispatch logout
3. User thấy đã logout → Cần login lại

### Scenario 2: Token expire trong khi dùng app
1. User click vào giỏ hàng → API call
2. Server trả về 401 → apiClient interceptor catch
3. Clear localStorage + show notification
4. Redirect to login page sau 1 giây

### Scenario 3: Normal usage
1. Token còn hạn → All API calls work normally
2. TokenValidator check mỗi 5 phút
3. AuthProvider verify token on app load

## Cấu hình

### Token check interval (TokenValidator):
```javascript
// Hiện tại: 5 phút
setInterval(checkTokenValidity, 5 * 60 * 1000);

// Có thể điều chỉnh theo nhu cầu:
setInterval(checkTokenValidity, 2 * 60 * 1000); // 2 phút
```

### Notification timeout:
```javascript
// Hiện tại: 5 giây
setTimeout(() => {
  setShowExpiredMessage(false);
}, 5000);
```

## Testing

### Test token expiration:
1. Login to app
2. Open DevTools → Application → Local Storage
3. Edit `access_token` value (make it invalid)
4. Try to access protected features
5. Should see logout notification and redirect

### Test app restart with expired token:
1. Login to app
2. Clear token from localStorage manually
3. Refresh page
4. Should be logged out automatically

## Files Modified

```
src/
├── services/
│   ├── apiClient.js (NEW)
│   ├── cartService.js (UPDATED)
│   └── userService.js (UPDATED)
├── components/
│   ├── AuthProvider.js (UPDATED)
│   └── TokenValidator.js (NEW)
├── utils/
│   └── auth.js (EXISTING)
└── App.js (UPDATED)
```

## Best Practices

1. **Always use apiClient** cho authenticated requests
2. **Never store sensitive data** in localStorage ngoài token
3. **Handle network errors** gracefully in UI
4. **Log authentication events** để debug
5. **Test token expiration scenarios** thường xuyên

## Troubleshooting

### Issue: Token không tự động clear
- Check browser console for errors
- Verify apiClient import đúng
- Check network tab for 401 responses

### Issue: Notification không hiện
- Check TokenValidator được import trong App.js
- Verify event listeners được add correctly
- Check React state updates

### Issue: Redirect loop
- Check login page không gọi authenticated APIs
- Verify token validation logic
- Check localStorage clear hoạt động đúng
