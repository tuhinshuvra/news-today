

const getCategories = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(news => displayCategories(news.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    // console.log(categories)

    const categoriesContainer = document.getElementById('categories-container');
    let category_id;
    for (let category of categories) {
        category_id = category.category_id;
        // console.log(category_id);

        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('category-li');
        span.classList.add('d-none');
        li.onclick = function () { getCategoryId(this) };
        li.innerHTML = `${category.category_name}`;
        span.innerHTML = `${category.category_id}`;
        li.appendChild(span);
        categoriesContainer.appendChild(li);
    }
}

let categoryId;
const getCategoryId = (event) => {
    categoryId = event.children[0].innerText;
    // return categoryId;
    getCategoryNews(categoryId);
    // console.log(categoryId);
}
const getCategoryNews = (category_id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(response => response.json())
        .then(news => displayCategoryNews(news.data));
}

const displayCategoryNews = (newsList) => {
    // console.log(newsList);

    const categoryNewsContainer = document.getElementById('category-news-container');
    categoryNewsContainer.innerHTML = '';

    for (let news of newsList) {
        console.log(news);
        const { image_url, details, title, author, total_view } = news;
        const { img, name, published_date } = author;

        const catNewsDiv = document.createElement('div');
        catNewsDiv.classList.add('card');
        catNewsDiv.classList.add('mb-3');
        catNewsDiv.innerHTML = `
        <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title fw-bold ">${title}</h5>
                                <p class="card-text">${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>                                
                            </div>

                            <div class=" card-body d-flex justify-content-between align-items-center">
                                <div class=" d-flex justify-content-between align-items-center">
                                    <div>
                                        <img style="width:50px ;" class=" rounded-circle " src="${img}" alt="">
                                    </div>
                                    <div class="">
                                        <p>${name}</p>
                                        <p>${published_date}</p>
                                    </div>
                                </div>

                                <div class=" d-flex justify-content-between">
                                    <div> <i class="fa-regular fa-eye"></i></div>
                                    <p>${total_view}</p>
                                </div>
                                <div class=" d-flex">
                                    <i class="fa-regular fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>

                            </div>
                        </div>
        </div>
    `;
        categoryNewsContainer.appendChild(catNewsDiv);
    }

}


getCategories();
// element.innerHTML = element.innerHTML + "additional HTML code"
