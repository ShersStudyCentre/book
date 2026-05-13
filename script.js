document.addEventListener('DOMContentLoaded', () => {
    
    // 1. WhatsApp Logic
    const orderBtn = document.getElementById('orderBtn');

if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        const phoneNumber = "27683901896"; 
        const message = "Hellos! I would love to order a copy of your book. Please provide the payment details.";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });
}

    // 2. Fetch Google Sheets Data
    // Replace this URL with your "Published to Web" CSV link
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQShiIxR612xCVRq3G-kfIQGyLcbwpm_i0HqxfTCrQOLpaVPhzYdBRbCx93-wbo8zyJtEldD5Q3fABp/pub?output=csv';

    async function fetchReviews() {
        try {
            const response = await fetch(SHEET_URL);
            const data = await response.text();
            
            // Simple CSV parser
            const rows = data.split('\n').slice(1); // Skip header row
            const grid = document.getElementById('reviews-grid');
            grid.innerHTML = ''; // Clear loading text

            rows.forEach(row => {
                const cols = row.split(',');
                if (cols.length >= 3) {
                    const [name, rating, comment] = cols;
                    
                    const card = document.createElement('div');
                    card.className = 'review-card';
                    card.innerHTML = `
                        <h3>${name}</h3>
                        <div class="stars">${'★'.repeat(parseInt(rating))}${'☆'.repeat(5-parseInt(rating))}</div>
                        <p>"${comment}"</p>
                    `;
                    grid.appendChild(card);
                }
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
            document.getElementById('reviews-grid').innerHTML = '<p>Check back soon for reviews!</p>';
        }
    }

    fetchReviews();
});