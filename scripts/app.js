document.addEventListener('DOMContentLoaded', function(){
    const list = [];

    const form = document.querySelector('.tourist-spots-form');
    const imageInput = document.querySelector('.tourist-spots-image-input-file');
    const titleInput = document.querySelector('.tourist-spots-text-input-title');
    const descriptionInput = document.querySelector('.tourist-spots-text-input-description');
    const newSpot = document.querySelector('.tourist-spots-card-new');
    const preview = document.querySelector('.tourist-spots-image-preview');

    form.addEventListener('submit', addNewSpot);

    imageInput.addEventListener('change', function () {
        const reader = new FileReader();
        reader.onload = function () {
            sessionStorage.setItem('imageURL', reader.result);
            preview.src = reader.result;
        }
        reader.readAsDataURL(imageInput.files[0]);


    });

    function addNewSpot(event) {
        event.preventDefault();

        const spotImage = sessionStorage.getItem('imageURL');
        const spotTitle = event.target['tourist-spots-text-input-title'].value;
        const spotDescription = event.target['tourist-spots-text-input-description'].value;

        if(spotTitle != '' && spotDescription != '') {
            const spot = {
                image: spotImage,
                title: spotTitle,
                description: spotDescription,
            };

            list.push(spot);

            renderSpot();
            resetInputs();
        }
    }

    function renderSpot() {
        let spotStructure = '';

        list.forEach(function(spot){
            spotStructure += `
                <div class='tourist-spots-result-card'>
                    <img class='tourist-spots-result-card-image' src='${spot.image}' alt='' />
                    <div class='tourist-spots-result-card-text'>
                        <h2 class='tourist-spots-result-card-title'>${spot.title}</h2>
                        <p class="tourist-spots-result-card-description">${spot.description}</p>
                    </div>
                </div>
                `;
        }); 
        newSpot.innerHTML = spotStructure;
    }

    function resetInputs() {
        preview.src = '';
        imageInput.value = '';
        titleInput.value = '';
        descriptionInput.value = '';

    }
})