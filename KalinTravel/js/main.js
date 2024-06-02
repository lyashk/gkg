document.addEventListener("DOMContentLoaded", function() {
    const countrySelect = document.getElementById("country-select");
    const transportSelect = document.getElementById("transport-select");
    const accommodationSelect = document.getElementById("accommodation-select");
    const dateInput = document.getElementById("date-input");
    const priceDisplay = document.getElementById("price");
    const discountDisplay = document.getElementById("discount");
    const bookButton = document.getElementById("book-button");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    function updatePrice() {
        const countryPrice = parseInt(countrySelect.value) || 0;
        const transportPrice = parseInt(transportSelect.value) || 0;
        const accommodationPrice = parseInt(accommodationSelect.value) || 0;
        let totalPrice = countryPrice + transportPrice + accommodationPrice;
        
        let discount = 0;
        const selectedDate = new Date(dateInput.value);
        const month = selectedDate.getMonth() + 1;

        // Check if the date is not in summer (June, July, August)
        if (month < 6 || month > 8) {
            discount = totalPrice * 0.20;  // 20% discount
            totalPrice -= discount;
            discountDisplay.textContent = `Скидка: ${discount.toFixed(0)}$`;
        } else {
            discountDisplay.textContent = 'Скидка: 0$';
        }

        priceDisplay.textContent = `${totalPrice.toFixed(0)}$`;
    }

    function showMessage(messageElement) {
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }

    function validateForm() {
        if (countrySelect.value && transportSelect.value && accommodationSelect.value && dateInput.value) {
            return true;
        } else {
            return false;
        }
    }

    countrySelect.addEventListener("change", updatePrice);
    transportSelect.addEventListener("change", updatePrice);
    accommodationSelect.addEventListener("change", updatePrice);
    dateInput.addEventListener("change", updatePrice);

    bookButton.addEventListener("click", function() {
        if (validateForm()) {
            showMessage(successMessage);
        } else {
            showMessage(errorMessage);
        }
    });

    // Инициализация начальной цены при загрузке страницы
    updatePrice();
});
