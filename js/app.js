//show extraphone
const showMore = (phones) => {
    const phoneContainer = document.getElementById("phone-container");
    console.log(phones);
    for (const phone of phones) {
        const { brand, phone_name, image, slug } = phone;
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');

        div.innerHTML = `<div class="card shadow">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">Brand: ${brand}</p>
        </div>
        <button class="btn btn-success" onclick="loadDetails('${slug}')"
        type="button">
                    Details
        </button>
    </div>`
        phoneContainer.appendChild(div);
        toggleSpinner('none');
    }
}

//spinner handler
const toggleSpinner = visibility => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = visibility;
}
//toggleError
const toggleError = (id, msg, visibility) => {
    const errorField = document.getElementById(id);
    const phoneContainer = document.getElementById("phone-container");
    errorField.innerText = msg
    errorField.style.display = visibility;
    phoneContainer.innerHTML = '';

}

//search button handeler 
document.getElementById("search-btn").addEventListener('click', function () {
    const inputField = document.getElementById('input-phone');
    const detailsContainer = document.getElementById('detailsContainer');

    const inputPhone = inputField.value;
    if (inputPhone == "") {
        toggleError('error', 'Please insert a phone name!', 'block');
        toggleSpinner('none');
        detailsContainer.innerHTML = "";
    }
    else {
        toggleError('error', '', 'none')
        loadPhone(inputPhone);
    }

})
//search phone by name handeler 
const loadPhone = phone => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`
    toggleSpinner('block');
    fetch(url)
        .then(response => response.json())
        .then(item => displayPhone(item))

}
const displayPhone = item => {
    const phones = item.data;
    const phoneContainer = document.getElementById("phone-container");
    const detailsContainer = document.getElementById('detailsContainer');
    const numberOfPhones = [];
    const extraPhones = [];
    if (phones == "") {
        toggleError('error', 'Nothing is found !', 'block');
        toggleSpinner('none');
        phoneContainer.innerHTML = '';
        detailsContainer.innerHTML = '';
    }
    // console.log(phones);
    else {
        const detailsContainer = document.getElementById('detailsContainer');
        detailsContainer.innerHTML = '';
        phoneContainer.innerHTML = '';

        for (const phone of phones) {
            const { brand, phone_name, image, slug } = phone;
            const div = document.createElement('div');
            div.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');

            div.innerHTML = `<div class="card shadow">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">Brand: ${brand}</p>
        </div>
        <button class="btn btn-success" onclick="loadDetails('${slug}')"
        type="button">
                    Details
        </button>
    </div>`
            toggleSpinner('none');

            if (phones.indexOf(phone) < 20) {
                phoneContainer.appendChild(div);
            }
            else if (phones.indexOf(phone) > 20) {
                extraPhones.push(phone);
                numberOfPhones.push(phones.indexOf(phone));
            }
        }
    }
    if (numberOfPhones.length > 20) {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('text-center', 'my-5');
        buttonDiv.innerHTML = `
        <button class="btn btn-success" id="showMorePhone">show more</button>
        `
        phoneContainer.appendChild(buttonDiv);
    }
    document.getElementById("showMorePhone").addEventListener('click', function () {
        showMore(extraPhones);
        document.getElementById('showMorePhone').style.display = "none";
    })
}

//details information handeler 
const loadDetails = id => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(response => response.json())
        .then(info => displayDetails(info))
}
const displayDetails = info => {
    const detailsContainer = document.getElementById('detailsContainer');
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = '';

    const { image, name, releaseDate } = info.data;
    const { storage, displaySize, chipSet, memory, sensors } = info.data.mainFeatures;
    const div = document.createElement('div')
    div.classList.add('col-12', 'px-3');
    div.classList.add('mx-auto');

    let ReleaseDate;
    if (releaseDate !== '') {
        ReleaseDate = releaseDate;
        console.log(ReleaseDate);
    }
    else {
        ReleaseDate = 'No release date is found'
        console.log(ReleaseDate);
    }
    div.innerHTML = `<div class="card shadow">
                        <img src="${image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Release Date: ${ReleaseDate}
                                <p class="card-text">Display size: ${displaySize}</p>
                                <p class="card-text">Storage: ${storage}</p>
                                <p class="card-text">Chipset: ${chipSet}</p>
                                <p class="card-text">Memory: ${memory}</p>
                                <p class="card-text">sensor: ${sensors}</p>

                                
                            </div>
                    </div>`
    detailsContainer.appendChild(div);
}
