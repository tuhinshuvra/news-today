

const getCategories = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(news => displayCategories(news.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    console.log(categories)

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
        .then(data => displayCategoryNews(data));
}

const displayCategoryNews = (news) => {
    console.log(news);

}


getCategories();
// element.innerHTML = element.innerHTML + "additional HTML code"
