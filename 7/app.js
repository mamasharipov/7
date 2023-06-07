const postsContainerE1 = document.getElementById("posts-container");
const loaderE1 = document.getElementById("loader");
const filterE1 = document.getElementById("filter");

console.log(postsContainerE1, loaderE1, filterE1);

let limit = 10;
let page = 1;
let loaderIndicator = false;
let dataFromBack = [];




const renderItem = (post) => {
    const { id, title, body } = post;

    return `
    <div class="post">
    <div class="number">${id}</div>
    <div class="posr_info">
    <h2${title}</h2>
    <p class="post_body">${body}</p>
    </div>
    </div>
    `;
};

const renderA11Items = (data) => {
    let template = "";

    for (let key in data) {
        template += renderItem(data[key]);
    }
    return template;
};

const getData = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

        page += 1;
        const data = await response.json();
        dataFromBack = [...dataFromBack, ...data];

        return data;
    } catch (err) {
        console.log(err);
    }
};

const showPosts = async () => {
    loaderE1.classList.add("show");
    loaderIndicator = true;

    const data = await getData();
    postsContainerE1.innerHTML += renderA11Items(data);

    loaderE1.classList.remove("show");
    loaderIndicator = false;
};

const onWindowScroll = () => {
    if (loaderIndicator) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight + 5 >= scrollHeight) {
        showPosts();
        console.log("first");
    }
};

const onSearch = (event) => {
    const term = event.target.value.toLowerCase();
    const filteredPosts = dataFromBack.filter((el) => el.title.includes(term));
    postsContainerE1.innerHTML = renderA11Items(filteredPosts);
};

showPosts();

window.addEventListener("scroll", onWindowScroll);
filterE1.addEventListener("input", onSearch);
