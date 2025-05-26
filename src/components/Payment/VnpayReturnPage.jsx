import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../../config/config";

const VnpayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Create an object with all query parameters from the URL
        const queryParams = {};
        searchParams.forEach((value, key) => {
          queryParams[key] = value;
        });

        // Verify the payment status with the backend
        const response = await axios.get(
          `${BASE_API_URL}/payment/vnpay-return/`,
          {
            params: queryParams,
          }
        );

        if (
          response.data &&
          response.data.message === "Thanh toán thành công"
        ) {
          setMessage("Thanh toán thành công");
          // Redirect to order-success page after 3 seconds
          setTimeout(() => {
            const orderId = response.data.order_id;
            console.log("respone at order success: ", response.data);
            navigate("/order-success", { state: { orderId } });
          }, 1000);
        } else {
          setMessage(
            "Có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng liên hệ hỗ trợ."
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setMessage("Đã có lỗi xảy ra. Vui lòng liên hệ hỗ trợ.");
      } finally {
        setIsLoading(false);
      }
    };

    processPaymentReturn();
  }, [searchParams, navigate]);

  return (
    <div className="text-center mt-5">
      <h2>{message}</h2>
      {isLoading && (
        <div className="spinner-border mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default VnpayReturnPage;
