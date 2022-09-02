

const getCategories = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(news => displayCategories(news.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    // console.log(categories)

    const categoriesContainer = document.getElementById('categories-container');
    for (let category of categories) {
        // console.log(category.category_name);

        const li = document.createElement('li');
        li.classList.add('category-li')
        li.innerHTML = `${category.category_name}`;
        categoriesContainer.appendChild(li);
    }

}
const getCategoryName = (event) => {
    console.log(event);
}


getCategories();
