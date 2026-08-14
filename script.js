document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('billing-toggle');
    const proPrice = document.getElementById('pro-price');
    let isYearly = false;

    toggle.addEventListener('click', () => {
        isYearly = !isYearly;
        toggle.classList.toggle('active');
        
        if (isYearly) {
            proPrice.textContent = '$20'; // example yearly price divided by 12
        } else {
            proPrice.textContent = '$24';
        }
    });
});
