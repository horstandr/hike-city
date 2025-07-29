// Make specialized forms functional.
const mainForm = document.getElementById('mainForm'),
        specializedForms = document.getElementById('specialized-forms');

mainForm.oninput = () => {
    specializedForms.className = `f-${getSelectedRadio()}`;
};


// Get selected radio button.
function getSelectedRadio() {
    const ele = document.getElementsByName('method');
    let result;
    
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            result = ele[i].value;
        }
    }

    return result;
}

// Add walking amount to walking slider.
const slider = document.getElementById('latlng-range');
const output = document.getElementById('latlng-range-output');

slider.oninput = function() {
    output.innerHTML = this.value + 'km';
}

// Form submit handler
function submitForm(actionUrl, method = 'POST', data = {}) {

    const form = document.createElement('form');
    form.method = method;
    form.action = actionUrl;
    form.style.display = 'none';

    // Create hidden inputs for each key-value pair
    for (const key in data) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);

    form.submit();

    setTimeout(() => form.remove(), 1000);
}

// Executes on form submit.
function handleFormSubmit(e) {
    let method = '';

    const latlng = document.getElementById('latlng');
    let latlngrange = 1;

    const city = document.getElementById('city');
    let cityname = '';

    if (city.checked) {
        method = 'city';
        cityname = document.getElementById('city-input').value;
    }
    if (latlng.checked) {
        latlngrange = document.getElementById('latlng-range').value;
    }


    e.preventDefault();

    submitForm('map.html', 'GET', {
        method: method,
        latlngrange: latlngrange,
        cityname: cityname
    });
}