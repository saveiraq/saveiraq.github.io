document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    if (!searchForm || !searchResults) {
        console.error('Required elements not found.');
        return;
    }

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fullName = event.target.full_name.value;

        try {
            const response = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ full_name: fullName }),
            });

            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function displayResults(results) {
        searchResults.innerHTML = ''; 
    
        if (results.length === 0) {
            searchResults.innerHTML = '<p>لا يوجد .</p>';
            return;
        }
    
        const resultList = document.createElement('ul');
        resultList.classList.add('result-list');
    
        results.forEach((result) => {
            const resultItem = document.createElement('li');
            resultItem.classList.add('result-item'); 
    
            // Create HTML structure for each result item
            const resultDetails = document.createElement('div');
            resultDetails.classList.add('result-details');
    
            resultDetails.innerHTML = `
                <h3>${result.P_NAME}</h3>
                <p>ID: ${result.PERSON_ID}</p>
                <p>الرتبة: ${result.P_RANK}</p>
                <p>علاوة: ${result.P_ALAWA}</p>
                <p>الصنف: ${result.P_CLASS}</p>
                <p>المديرية: ${result.P_UNIT}</p>
                <p>الوحدة: ${result.M_UNIT}</p>
                <p>الحالة: ${result.P_STATUS}</p>
                <p>الشهادة: ${result.P_QUALIFICATION || 'N/A'}</p>
                <p>تاريخ الترقية: ${result.P_RANK_DATE}</p>

            `;
    
            resultItem.appendChild(resultDetails);
            resultList.appendChild(resultItem);
        });
    
        searchResults.appendChild(resultList);
    }
    
});
