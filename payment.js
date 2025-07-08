document.addEventListener('DOMContentLoaded', () => {
    // Select all radio option labels
    const radioOptions = document.querySelectorAll('.radio-option');

    // Add click event listener to each radio option label
    radioOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            const inputRadio = option.querySelector('input[type="radio"]');
            if (inputRadio) {
                // Unselect all other radio options in the same group
                document.querySelectorAll(`input[name="${inputRadio.name}"]`).forEach(otherInput => {
                    otherInput.closest('.radio-option').classList.remove('selected');
                });
                // Select the clicked radio option
                option.classList.add('selected');
                inputRadio.checked = true;
            }
        });
    });

    // Quantity controls for the item
    const itemQtySpan = document.getElementById('itemQty');
    const itemPriceSpan = document.getElementById('itemPrice');
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');

    let itemQuantity = parseInt(itemQtySpan.textContent);
    const baseItemPrice = 5.90; // Price per burger

    // Function to update item quantity and price
    const updateItemQuantityAndPrice = () => {
        itemQtySpan.textContent = itemQuantity;
        itemPriceSpan.textContent = `$${(itemQuantity * baseItemPrice).toFixed(2)}`;
        updateOrderSummary();
    };

    decreaseQtyBtn.addEventListener('click', () => {
        if (itemQuantity > 1) {
            itemQuantity--;
            updateItemQuantityAndPrice();
        }
    });

    increaseQtyBtn.addEventListener('click', () => {
        itemQuantity++;
        updateItemQuantityAndPrice();
    });

    // Tip options
    const tipOptions = document.querySelectorAll('.tip-option');
    let selectedTipPercentage = 0; // Default tip

    tipOptions.forEach((tipOption, index) => {
        tipOption.addEventListener('click', () => {
            tipOptions.forEach(opt => opt.classList.remove('selected')); // Deselect all
            tipOption.classList.add('selected'); // Select current
            let tipValue = tipOption.dataset.tip;

            const updateTipAmount = (percentage, isAmount = false) => {
   
                selectedTipPercentage = percentage;
                updateOrderSummary(isAmount);
            };

            if (tipValue === 'other') {
                // Replace the prompt with an input field inside the "Other" tip option
                let otherTipOption = document.querySelector('.tip-option[data-tip="other"]');
                otherTipOption.innerHTML = '<input type="number" id="customTipInput" placeholder="Custom" class="w-20 px-2 py-1 border rounded-md text-gray-700 focus:border-orange-500 focus:outline-none">';

                let customTipInput = document.getElementById('customTipInput');
                customTipInput.focus(); // Focus the input field

                customTipInput.addEventListener('blur', () => {
                    const customTip = customTipInput.value;

                    if (customTip !== null) {
                        const parsedTip = parseFloat(customTip);
                        if (!isNaN(parsedTip) && parsedTip >= 0) {
                            updateTipAmount(parsedTip, true);
                        } else {
                            tipOptions[0].click(); // Reset to last selected tip
                            updateTipAmount(0);
                        }
                    }

                    // After processing, revert back to the "Other" button if needed (optional)
                    if (isNaN(parseFloat(customTip)) || parseFloat(customTip) < 0) {
                        otherTipOption.textContent = "Other";
                    } else {
                        otherTipOption.textContent = "$" + customTip;
                    }
                });
            } else {
                updateTipAmount(parseInt(tipValue));
                // If it's not "Other", update the display immediately
                tipOptions.forEach(opt => {
                    opt.textContent = opt.dataset.tip === "other" ? "Other" : opt.dataset.tip + "%";
                });

            }
            updateOrderSummary();
        });
    });

    // Initial selection for 0% tip to match the image if no other is selected
    document.querySelector('.tip-option[data-tip="0"]').classList.add('selected');


    // Order Summary Calculation
    const deliveryCostSpan = document.getElementById('deliveryCost');
    const packageCostSpan = document.getElementById('packageCost');
    const tipAmountSpan = document.getElementById('tipAmount');
    const subTotalSpan = document.getElementById('subTotal');
    const taxAmountSpan = document.getElementById('taxAmount');
    const totalAmountSpan = document.getElementById('totalAmount');

    const taxRate = 0.0875; // 8.75%

    const updateOrderSummary = (isAmount = false) => {
        const currentItemTotal = itemQuantity * baseItemPrice;
        const deliveryCost = 3.00; // Example fixed delivery cost for calculation
        const packageCost = 1.00;

        let calculatedTip = 0;
        if (selectedTipPercentage > 0 && !isAmount) {
            calculatedTip = currentItemTotal * (selectedTipPercentage / 100);
        } else if (isAmount) {
            calculatedTip = selectedTipPercentage; // Use the custom amount directly
        }

        const subTotal = currentItemTotal + deliveryCost + packageCost + calculatedTip;
        const tax = subTotal * taxRate;
        const total = subTotal + tax;

        // Update display
        deliveryCostSpan.textContent = `$${deliveryCost.toFixed(2)}`; // Or dynamic range
        packageCostSpan.textContent = `$${packageCost.toFixed(2)}`;
        tipAmountSpan.textContent = `$${calculatedTip.toFixed(2)}`;
        subTotalSpan.textContent = `$${subTotal.toFixed(2)}`;
        taxAmountSpan.textContent = `$${tax.toFixed(2)}`;
        totalAmountSpan.textContent = `$${total.toFixed(2)}`;
    };

    // Initial update of the order summary
    updateOrderSummary();
});