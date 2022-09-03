

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
    getLoader(true);

    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(response => response.json())
        .then(news => displayCategoryNews(news.data));
}

const displayCategoryNews = (newsList) => {

    let newListLength;
    newListLength = newsList.length;
    const newsFound = document.getElementById('newsFound');
    if (newListLength === 0) {
        newsFound.classList.remove('d-none');
    } else {
        newsFound.classList.add('d-none');
    }

    const categoryNewsContainer = document.getElementById('category-news-container');
    categoryNewsContainer.innerHTML = '';

    for (let news of newsList) {
        // console.log(news);
        const { image_url, details, title, author, total_view, _id } = news;
        const { img, name, published_date } = author;
        // const { newsId } = _id;

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
                                <h6 class="card-title fw-bold ">${title}</h6>
                                <p class="card-text">${details.length > 180 ? details.slice(0, 180) + '...' : details}</p>                                
                            </div>

                            <div class=" card-body d-flex justify-content-between align-items-center">
                                <div class=" d-flex justify-content-center align-items-center ">
                                    <div>
                                        <img style="width:50px ;" class=" rounded-circle " src="${img}" alt="">
                                    </div>
                                    <div class=" ">
                                        <p class=" m-0">${name != null ? name : "Name Unavailable"}</p>
                                        <p class=" m-0">${published_date != null ? published_date : "Date Unavailable"}</p>
                                    </div>
                                </div>

                                <div class="">
                                    <div class=" d-inline"> <i class="fa-regular fa-eye"></i></div>
                                    <p class=" d-inline">${total_view != null ? total_view : "No Data Available"}</p >
                                </div >
                                <div class=" d-flex">
                                    <i class="fa-regular fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div>
                                    <button onclick="getNewsDetails('${_id}')"  class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsTodayModal"></button>
                                </div>

                            </div >
                        </div >
        </div >
    `;
        categoryNewsContainer.appendChild(catNewsDiv);
    }
    getLoader(false);
}

const getLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

const getNewsDetails = (newsId) => {
    // console.log(newsId);
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(response => response.json())
        .then(data => setNewsDetails(data.data))
        .catch(error => console.log(error))
}

const setNewsDetails = (newsDetails) => {
    console.log(newsDetails[0]);
    const { title, details, author, thumbnail_url } = newsDetails[0];
    const { img, name, published_date } = author;


    console.log(title, details, name, published_date, thumbnail_url);
    const newsTodayModalLabel = document.getElementById('newsTodayModalLabel');
    const newsDetailsField = document.getElementById('newsDetails');
    newsTodayModalLabel.innerText = `${title}`;
    newsDetailsField.innerText = `${details}`;


}

getCategories();
// category_id  details image_url others_info
// thumbnail_url title total_view _id 
