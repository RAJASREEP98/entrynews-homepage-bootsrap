const main = document.getElementById('main');
const loading = document.querySelector('.loading');
const theme = document.getElementById('theme');
const root = document.querySelector(':root');
const moon = document.getElementById('moon');
const searchIcon = document.getElementById('search-icon');
const modeText = document.getElementById('mode');
const regionFilter = document.querySelector('.options');
const searchInput = document.getElementById('search');

let countries = [];

async function runProcess() {
    try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        countries = data;
        loading.innerHTML = "";

        renderFlags(countries);
    } catch (err) {
        console.log(err);
    }
}

function renderFlags(countriesData) {
    main.innerHTML = ""; // Clear previous content

    countriesData.forEach(country => {
        // Create country container
        const countryContainer = document.createElement('div');
        countryContainer.classList.add('country');

        // Create flag container and flag image
        const flagContainer = document.createElement('div');
        flagContainer.classList.add('flag-container');
        const flagImg = document.createElement('img');
        flagImg.classList.add('flag');
        flagImg.src = country.flag;
        flagContainer.appendChild(flagImg);

        // Create country details container
        const countryDetails = document.createElement('div');
        countryDetails.classList.add('country-details');
        const countryName = document.createElement('h2');
        countryName.classList.add('country-name');
        countryName.textContent = country.name;

        const population = document.createElement('span');
        population.innerHTML = `<strong>Population:</strong> ${country.population}<br>`;

        const region = document.createElement('span');
        region.innerHTML = `<strong>Region:</strong> ${country.region}<br>`;

        const capital = document.createElement('span');
        capital.innerHTML = `<strong>Capital:</strong> ${country.capital}<br>`;

        // Append child elements
        countryDetails.appendChild(countryName);
        countryDetails.appendChild(population);
        countryDetails.appendChild(region);
        countryDetails.appendChild(capital);

        // Append flag container and country details to country container
        countryContainer.appendChild(flagContainer);
        countryContainer.appendChild(countryDetails);

        // Append country container to main container
        main.appendChild(countryContainer);
    });
}

// Filter flags by region
function filterByRegion(region) {
    if (region === "All") {
        renderFlags(countries);
    } else {
        const filteredCountries = countries.filter(country => country.region === region);
        renderFlags(filteredCountries);
    }
}

// Search functionality
function searchCountries(query) {
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase())
    );
    renderFlags(filteredCountries);
}

runProcess();

let mode = localStorage.getItem("mode");
theme.addEventListener("click", () => {
    if (mode === "dark") {
        localStorage.setItem("mode", "light");
    } else {
        localStorage.setItem("mode", "dark");
    }
    mode = localStorage.getItem("mode");
    changeTheme();
});

function changeTheme() {
    if (mode === "dark") {
        root.style.setProperty("--bg", "#202c37");
        root.style.setProperty("--text", "#ffffff");
        root.style.setProperty("--lbg", "#2b3945");
        moon.src = "icons/moon-regular.svg";
        searchIcon.src = "icons/search-regular.svg";
        modeText.textContent = "Light Mode";
    } else {
        root.style.setProperty("--bg", "#fafafa");
        root.style.setProperty("--text", "#111517");
        root.style.setProperty("--lbg", "#ffffff");
        moon.src = "icons/moon-solid.svg";
        searchIcon.src = "icons/search-solid.svg";
        modeText.textContent = "Dark Mode";
    }
}

regionFilter.addEventListener("click", (event) => {
    if (event.target.classList.contains("region")) {
        const region = event.target.dataset.value;
        filterByRegion(region);
    }
});

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    searchCountries(query);
});

