


fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => console.log(data))