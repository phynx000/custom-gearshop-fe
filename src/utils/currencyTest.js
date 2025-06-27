// Test currency formatting functions
const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return "0₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCurrencyShort = (amount) => {
  if (!amount || isNaN(amount)) return "0₫";

  // Ưu tiên hiển thị bằng triệu đồng
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + " triệu₫";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "K₫";
  }
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
};

// Test cases
console.log("Test Currency Formatting:");
console.log("1,000₫:", formatCurrency(1000));
console.log("50,000₫:", formatCurrency(50000));
console.log("1,000,000₫:", formatCurrency(1000000));
console.log("25,500,000₫:", formatCurrency(25500000));
console.log("1,250,000,000₫:", formatCurrency(1250000000));

console.log("\nTest Short Currency Formatting for Charts:");
console.log("1K₫:", formatCurrencyShort(1000));
console.log("50K₫:", formatCurrencyShort(50000));
console.log("1.0 triệu₫:", formatCurrencyShort(1000000));
console.log("25.5 triệu₫:", formatCurrencyShort(25500000));
console.log("1250.0 triệu₫:", formatCurrencyShort(1250000000));
