console.log('Hi this is Shubham\nContact at shubhamprakash702@gmail.com for any issue');
// news_api_key = 2ddd527e51644ef8a3b329adf0bc718d (news.org)

// grab the news container
let myNews = document.getElementById('myNews');

// initialising the variable
let api = '2ddd527e51644ef8a3b329adf0bc718d';
let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`;

// fetching news from the news api
fetch(url)
.then(response => response.json())
.then(data => {
//   console.log(data) // Prints result from `response.json()` in getRequest
//   console.log(data.length)
  putNews(data)
})
.catch(error => {
    console.error(error);
    myNews.innerHTML = "Something went wrong. Please refresh";
})

function putNews(data){
    let articles = data.articles;
    // console.log(articles);
    let newsHtml = "";
    articles.forEach((element,index) => {
        // console.log(index, element);
        let news = `
            <div class="card-fluid w-75 my-3 newsBox" style="border: 1px solid rgb(162, 162, 241);margin: auto;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element["urlToImage"]}" class="img-fluid rounded-start" alt="Image Not Found">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title search">${element["title"]}</h5>
                            <p class="card-text search">${element["content"]} <a href="${element["url"]}" target="_blank">Go to article</a></p>
                            <p class="card-text search"><small class="text-muted">By - ${element["source"]["name"]}</small></p>
                            <p class="card-text"><small class="text-muted">publishedAt - ${element["publishedAt"]}</small></p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="accordion accordion-flush my-2" id="accordionFlushExample${index}"
                    style="width: 98%;margin: auto;">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapse${index}" aria-expanded="false"
                                aria-controls="flush-collapse${index}">
                                Description
                            </button>
                        </h2>
                        <div id="flush-collapse${index}" class="accordion-collapse collapse"
                            aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample${index}">
                            <div class="accordion-body search">${element["description"]}</div>
                        </div>
                    </div>
                </div>
            </div>`;
    newsHtml += news;
    });
    myNews.innerHTML = newsHtml;
}

// made the search option functional
let search = document.getElementById('searchTxt');
let counter;

search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let newsBox = document.getElementsByClassName('newsBox');
    Array.from(newsBox).forEach((element)=>{
        let newsSearch = element.getElementsByClassName('search');
        Array.from(newsSearch).forEach((para)=>{
            searchText = para.innerText.toLowerCase();
            if (searchText.includes(inputVal)){
                counter++;
            }
            // console.log(searchText);
        })
        if (counter > 0){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        counter = 0;
    })
})

let searchSubmit = document.getElementById('searchSubmit')
searchSubmit.addEventListener("click", (e)=>{
    e.preventDefault();
})

