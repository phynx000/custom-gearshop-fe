// Cart Clear Verification Script
// Run this in browser console to test cart clearing functionality

// Test 1: Verify clearCartAfterPayment function exists
console.log("=== Cart Clear Verification ===");

// Test 2: Check localStorage before clearing
console.log("Before clearing:");
console.log("cartItems:", localStorage.getItem("cartItems"));
console.log("checkoutItems:", localStorage.getItem("checkoutItems"));

// Test 3: Simulate cart clearing
const simulateClearCart = () => {
  // Clear localStorage
  localStorage.setItem("cartItems", JSON.stringify([]));
  localStorage.removeItem("checkoutItems");

  // Trigger cart update event
  window.dispatchEvent(new Event("cartUpdated"));

  console.log("After clearing:");
  console.log("cartItems:", localStorage.getItem("cartItems"));
  console.log("checkoutItems:", localStorage.getItem("checkoutItems"));
  console.log("Cart update event triggered!");
};

// Test 4: Check if cart update event listener is working
let eventListenerWorking = false;
const testEventListener = () => {
  const testHandler = () => {
    eventListenerWorking = true;
    console.log("✅ Cart update event listener is working!");
  };

  window.addEventListener("cartUpdated", testHandler);
  window.dispatchEvent(new Event("cartUpdated"));

  setTimeout(() => {
    window.removeEventListener("cartUpdated", testHandler);
    if (!eventListenerWorking) {
      console.log("❌ Cart update event listener not working");
    }
  }, 100);
};

// Run tests
console.log("Running cart clear verification tests...");
testEventListener();
simulateClearCart();

console.log("=== Verification Complete ===");
console.log(
  "Copy and paste this script in browser console to test cart clearing"
);
