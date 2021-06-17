let categories = [];
let catId = [];
let cluesArray = [];
let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
let button = document.querySelector('button');
let count = 0;

async function getCategoryIds() {
    const response = await axios.get("http://jservice.io/api/categories?count=10");
    console.log(response.data);
    let NUM_CATEGORIES = _.sampleSize(response.data, 6);
    for (let num of NUM_CATEGORIES) {
        catId.push(num.id);
    }
    console.log(catId);
    return catId;
}

function getCategory(catId) {
    catId.map(async function (id) {
        const response2 = await axios.get(`http://jservice.io/api/clues?category=${id}`);
        let clues = response2.data;
        for (let clue of clues) {
            title = clue.category.title;
            question = clue.question;
            answer = clue.answer;
            showing = null;

            cluesArray = _.sampleSize(cluesArray, 5);
            cluesArray.push({ question, answer, showing });
        }
        let catClues = {
            title: title,
            cluesArray: cluesArray,
        }
        categories.push(catClues);
    })
    return (categories);
}

function fillTable(categories) {
    console.log(categories);
    for (let cat of categories) {
        let newTh = document.createElement("th");
        let text = document.createTextNode(cat.title);
        newTh.appendChild(text);
        thead.append(newTh);

        let row = document.createElement('tr');
        tbody.append(row);

        for (let i = 0; i < cat.cluesArray.length; i++) {
            let cell = document.createElement("TD");
            cell.innerText = "?";
            cell.style.textAlign = 'center';
            cell.classList.add('td');

            let click = 0;
            cell.addEventListener('click', function () {

                if (click == 0) {
                    cell.innerText = cat.cluesArray[i].question;
                    click++;
                }
                else {
                    cell.style.backgroundColor = 'green';
                    cell.innerText = cat.cluesArray[i].answer;
                }
            })
            row.append(cell);
        }

    }
}


button.addEventListener('click', async function () {
    if (count == 0) {
        button.innerHTML = 'Loading...';
        await getCategoryIds();
        getCategory(catId);
        setTimeout(() => {
            fillTable(categories);
        }, 500);
        $(".loader").hide();
        count++;
        button.innerHTML = "Restart!";
    }
    else {
        categories = [];
        catId = [];
        cluesArray = [];
        $('tbody').empty();
        $('thead').empty();
        $(".loader").show();
        count--;
    }
});








