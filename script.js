// API
const tcpaApi = "https://api.uspeoplesearch.net/tcpa/v1?x=";

// Show loading spinner
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Display DNC Lookup data
function displayData(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>State:</strong> ${data.state || 'N/A'}</p>
        <p><strong>DNC National:</strong> ${data.dncNational || 'N/A'}</p>
        <p><strong>DNC State:</strong> ${data.dncState || 'N/A'}</p>
        <p><strong>Litigator:</strong> ${data.litigator || 'N/A'}</p>
        <p><strong>Blacklist:</strong> ${data.blacklist || 'N/A'}</p>
        <p><strong>DNC Status:</strong> ${data.dncNational === "Clean" && data.dncState === "Clean" ? "Not in DNC Registry" : "In DNC Registry"}</p>
    `;
}

// Fetch data from API
async function fetchData() {
    const query = document.getElementById('query').value;
    const resultDiv = document.getElementById('result');

    if (!query) {
        resultDiv.textContent = "Please enter a phone number.";
        return;
    }

    showLoading();
    resultDiv.textContent = "";

    try {
        // Fetch data from TCPA API
        const response = await fetch(`${tcpaApi}${query}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = "Error: " + data.error;
        } else {
            displayData(data);
        }
    } catch (error) {
        resultDiv.textContent = "Error fetching data.";
        console.error(error);
    } finally {
        hideLoading();
    }
}
