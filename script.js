// script.js 2

document.addEventListener('DOMContentLoaded', function () {
  // Add the click event listener to the search button
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', search);
});

function search() {
  const firstName = document.getElementById('firstNameInput').value;
  const fatherName = document.getElementById('fatherNameInput').value;
  const grandfatherName = document.getElementById('grandfatherNameInput').value;
  const birthDate = document.getElementById('birthDateInput').value;

  console.log('First Name:', firstName);
  console.log('Father Name:', fatherName);
  console.log('Grandfather Name:', grandfatherName);
  console.log('Birth Date:', birthDate);

  // Make a request to the server with the search query
  fetch(`/?firstName=${encodeURIComponent(firstName)}&fatherName=${encodeURIComponent(fatherName)}&grandfatherName=${encodeURIComponent(grandfatherName)}&birthDate=${encodeURIComponent(birthDate)}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Search Results:', data);

      const searchResultsContainer = document.getElementById('searchResults');
      searchResultsContainer.innerHTML = '';

      if (data.length === 0) {
        searchResultsContainer.innerHTML = '<p>مموجود</p>';
      } else {
        const table = document.createElement('table');
        table.innerHTML = `
          <tr>
            <th>رقم العائلة</th>
            <th>الأسم الاول</th>
            <th>اسم الأب</th>
            <th>اسم الجد</th>
            <th>التولد</th>
            <th>العمل</th>
            <th>اسم الام</th>
            <th>أم الأم</th>
            <th>اسم المنطقة</th>
            <th>محلة</th>
            <th>زقاق</th>
            <th>دار</th>
          </tr>
        `;

        data.forEach((result) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${result.fam_no}</td>
            <td>${result.p_first}</td>
            <td>${result.p_father}</td>
            <td>${result.p_grand}</td>
            <td>${result.p_birth}</td>
            <td>${result.p_job}</td>
            <td>${result.p_mother}</td>
            <td>${result.gr_mother}</td>
            <td>${result.rc_name}</td>
            <td>${result.f_area}</td>
            <td>${result.f_street}</td>
            <td>${result.f_house}</td>
          `;

          table.appendChild(row);
        });

        searchResultsContainer.innerHTML = '';
        searchResultsContainer.appendChild(table);
        searchResultsContainer.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

