# OrderStatusEditor Component

## Mô tả
Component React cho phép nhân viên (staff) quản lý và cập nhật trạng thái đơn hàng và trạng thái thanh toán.

## API Integration
- **Endpoint**: `/staff/orders/<order_id>/update-status/`
- **Method**: PATCH
- **Request Body**: 
  ```json
  {
    "status": "Delivering",
    "payment_status": "Paid"
  }
  ```

## Cách sử dụng

### Import Component
```javascript
import OrderStatusEditor from "./OrderStatusEditor";
```

### Sử dụng trong JSX
```javascript
<OrderStatusEditor
  order={selectedOrder}
  onStatusUpdate={handleStatusUpdate}
  isStaff={true}
/>
```

### Props
- `order`: Object đơn hàng cần cập nhật trạng thái
- `onStatusUpdate`: Callback function được gọi khi cập nhật thành công
- `isStaff`: Boolean xác định quyền truy cập (mặc định: true)

## Tính năng

### Trạng thái đơn hàng (status)
- Pending (Chờ xác nhận)
- Confirmed (Đã xác nhận)
- Processing (Đang xử lý)
- Delivering (Đang giao hàng)
- Delivered (Đã giao hàng)
- Completed (Hoàn tất)
- Cancelled (Đã hủy)
- Refunded (Đã hoàn tiền)

### Trạng thái thanh toán (payment_status)
- Paid (Đã thanh toán)
- Unpaid (Chưa thanh toán)
- Pending (Chờ thanh toán)

## Bảo mật
- Hiển thị cảnh báo nếu người dùng không phải staff
- Xác nhận trước khi cập nhật: "Bạn có chắc chắn muốn cập nhật không?"
- Hiển thị thông báo thành công/lỗi

## Styling
- Sử dụng Bootstrap components
- Custom SCSS cho giao diện
- Responsive design
- Loading indicators

## Ví dụ sử dụng trong Modal
```javascript
<Modal show={showStatusEditor} onHide={() => setShowStatusEditor(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <OrderStatusEditor
      order={selectedOrder}
      onStatusUpdate={handleStatusUpdate}
      isStaff={true}
    />
  </Modal.Body>
</Modal>
```
