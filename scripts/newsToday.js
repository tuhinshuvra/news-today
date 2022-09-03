

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

    categories.forEach(category => {
        // for (let category of categories) {
        category_id = category.category_id;
        // console.log(category_id);

        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('category-li');
        span.classList.add('d-none');
        li.onclick = function () { getCategoryId(this) };
        li.innerHTML = `${category.category_name} `;
        span.innerHTML = `${category.category_id}`;
        li.appendChild(span);
        categoriesContainer.appendChild(li);
        // }
    })
}

let categoryId;
let categoryName;
const categoryNameField = document.getElementById('category-name');
const getCategoryId = (event) => {
    categoryId = event.children[0].innerText;
    categoryName = event.innerText;

    categoryNameField.innerText = `${categoryName}`;
    getCategoryNews(categoryId);
}

const getCategoryNews = (category_id) => {
    getLoader(true);

    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(response => response.json())
        .then(news => displayCategoryNews(news.data))
        .catch(error => console.log(error));
}

const displayCategoryNews = (newsList) => {

    let newListLength;
    newListLength = newsList.length;

    const newsCountField = document.getElementById('news-count');
    newsCountField.innerText = `${newListLength} news found in`;

    // console.log(newsList);
    const newsFound = document.getElementById('newsFound');
    if (newListLength === 0) {
        newsFound.classList.remove('d-none');
    } else {
        newsFound.classList.add('d-none');
    }

    const categoryNewsContainer = document.getElementById('category-news-container');
    categoryNewsContainer.innerHTML = '';

    const sorttedList = newsList.sort((a, b) => (a.total_view < b.total_view) ? 1 : (a.total_view === b.total_view) ? ((a.total_view < b.total_view) ? 1 : -1) : -1)

    sorttedList.forEach(news => {
        // for (let news of sorttedList) {
        // console.log(news);
        const { image_url, details, title, author, total_view, _id } = news;
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
                                <h6 class="card-title fw-bold ">${title}</h6>
                                <p class="card-text">${details.length > 180 ? details.slice(0, 180) + '...' : details}</p>                                
                            </div>

                            <div class=" card-body d-flex justify-content-between align-items-center">
                                <div class=" d-flex justify-content-center align-items-center ">
                                    <div>
                                        <img style="width:50px ;" class=" rounded-circle " src="${img}" alt="">
                                    </div>
                                    <div class=" ">
                                        <p class="news-sm-view m-0">${(name != null ? name : "Name Unavailable") || (name != '' ? name : "Name Unavailable")}</p>
                                        <p class="news-sm-view m-0">${published_date != null ? published_date : "Date Unavailable"}</p>
                                    </div>
                                </div>

                                <div class="">
                                    <div class=" d-inline"> <i class="fa-regular fa-eye"></i></div>
                                    <p class=" d-inline news-sm-view">${total_view != null ? total_view : "No Data Available"}</p >
                                </div >
                                <div class=" news-sm-view d-flex ">
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
        // }
    })
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
        .then(data => setNewsDetailsModal(data.data))
        .catch(error => console.log(error))
}

const setNewsDetailsModal = (newsDetails) => {
    // console.log(newsDetails[0]);
    const newsDetailsList = newsDetails[0];
    // console.log(newsDetailsList);
    const { details, author, thumbnail_url, title } = newsDetailsList;
    const { img, name, published_date } = author;

    const newsTodayModalLabel = document.getElementById('newsTodayModalLabel');
    const newsDetailsField = document.getElementById('newsDetails');
    const authorField = document.getElementById('author');
    const publishDateField = document.getElementById('publish-date');
    newsTodayModalLabel.innerText = `${title}`;
    newsDetailsField.innerText = `${details}`;
    authorField.innerText = `Author-${name},`;
    publishDateField.innerText = ` Published-${published_date}`;
}

getCategories();