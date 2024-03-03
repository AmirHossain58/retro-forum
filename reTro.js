let cardContainer =document.getElementById('card-container');
const loading=(isLoading)=>{
    const loadingS= document.getElementById('loading')
    // console.log(loadingS.classList);
    if(isLoading===true){
        console.log(loadingS.classList);
        loadingS.classList.remove('hidden')
    }else{
        console.log(loadingS.classList);
        loadingS.classList.add('hidden')
    }
    }


const allPosts= async()  => {
    const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data =await res.json();
    const posts=data.posts;
    // console.log(posts[0]);
    // console.log(res);
    postsCard(posts)
    
}
const searchHereBtn=()=>{
    loading(true)
    const searchText= document.getElementById('searchHere').value
    allPosts2(searchText)
}

const allPosts2= async(categoryName)  => {
    cardContainer.innerText=''
    // console.log(categoryName);
    const res= await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data =await res.json();
    const posts=data.posts;
    console.log(posts);
    // console.log(res);
    postsCard(posts)
    // loading(true)
}


// loading(true)
const postsCard=(posts)=>{
    loading(true)
console.log(posts)
    posts.forEach(post => {
      const  div=document.createElement('div')
      
      div.innerHTML=`
      <div class="bg-[#797DFC1A] flex flex-col lg:flex-row p-3  lg:p-10 gap-6 rounded-3xl border-2 border-[#797DFC]">
      <div   class="w-[72px] h-[72px] rounded-xl bg-white relative">
      <img src="${post.image}" alt="">
          <div id="icons" class="absolute -top-[7%] -right-[4%] "><i class="fa-solid fa-circle ${post.isActive?"text-green-500" : "text-red-500"}" ></i></div>
      </div>
      <div class="space-y-4"> 
          <div class="flex gap-5 inter font-medium text-[#12132DCC]"><p># ${post.category}</p><p>Author : ${post.author.name}</p></div>
          <p class="text-lg font-bold ">${post.title}</p>
          <p class="text-[#12132D99] lg:max-w-[570px] ">${post.description}</p>
          <hr>
          <div class="flex justify-between items-center">
          <div class="flex gap-6 inter text-[#12132D99]">
              <span><i class="fa-solid fa-message"></i> ${post.comment_count}</span>
              <span><i class="fa-regular fa-eye"></i> ${post.view_count
              }</span>
              <span><i class="fa-regular fa-clock"></i><span> ${post.
                posted_time} min</span></span>
          </div>
          <div onclick="markAsRead('${post.title}','${post.view_count}')" class="bg-[#10B981] rounded-3xl p-1"><i class="fa-solid fa-envelope text-white"></i></div>
      </div>
      </div>
  </div>
  

      `
      
     
      cardContainer.appendChild(div)
    });
    setTimeout(function(){ loading(false) }, 2000);
 
}
const icons=(isActive)=>{
  const icons=document.getElementById('icons')
  console.log(icons);
  if(isActive){
    icons.classList.add('text-[#10B981]')
  }else{
    // icons.classList.remove('')
    icons.classList.add('text-[#FF3434]')
  }
}
// const time1=   setTimeout(loading(false),3000)

const readTitelContainer=document.getElementById('read-titel-container')
let readPost=0;
const markAsRead=(title,view)=>{

const div =document.createElement('div')

div.innerHTML=`
    <div class="flex justify-between p-4 bg-white rounded-3xl">
        <p class="text-[#12132D] font-bold ">${title}</p>
        <p class="flex items-center"><i class="fa-regular fa-eye"></i>${view} </p>
    </div>
`
readTitelContainer.appendChild(div)
const read=document.getElementById('read-post').innerText=readPost+=1
}
const latestCardContainer=document.getElementById('latestCardContainer')
const latestPosts= async()  => {
    const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data =await res.json();
   
    // console.log(data);
    // console.log(res);
    latestPostsCard(data)
}
const latestPostsCard=(posts)=>{
    // console.log(posts);
    posts.forEach(post => {
        const  div=document.createElement('div')
        div.innerHTML=`
  <div class="card w-96 bg-base-100 border shadow-xl">
    <div class=" px-10 py-5"><figure><img class="rounded-2xl" src="${post.cover_image}" alt="Shoes" /></figure></div>
    <div class="card-body">
        <p class="text-[#12132D99]"><i class="fa-solid fa-calendar-days"></i><span>${post.author?.posted_date||' No Publish Date'}</span> </p>
        <h2 class="card-title font-bold">${post.title}</h2>
        <p class="text-[#12132D99]">${post.description} </p>
        <div class=" flex gap-4">
        <div class ="w-[44px] h-[44px] rounded-[50%]"><img class="rounded-[50%]" src="${post?.profile_image}" alt=""></div>
        
        <div>
            <h3 class="font-bold">${post?.author.name}</h3>
            <p class="text-[#12132D99]">${post.author?.designation  || ' Unknown'}</p>
        </div>
        </div>
    </div>
    </div>
        `
        latestCardContainer.appendChild(div)
})
}





// read.innerText=readPost+1
// console.log(readPost);

latestPosts()
allPosts()


// 0
// : 
// author
// : 
// {name: 'John Doe', designation: 'ROR Developer', posted_date: '29 January 2024'}
// cover_image
// : 
// "https://i.ibb.co/VYGSkLz/pexels-jeshootscom-442576.jpg"
// description
// : 
// "Leading gaming expert with a wealth of knowledge and passion for all things gaming"
// profile_image
// : 
// "https://i.ibb.co/z8zx95w/pexels-davide-de-giovanni-1649675.jpg"
// title
// : 
// "Gaming Enthusiast Expert in Play"
// [[Prototype]]
// : 
// Object
// 1
// : 
// {cover_image: 'https://i.ibb.co/hC2CtK2/pexels-monstera-production-7412067.jpg', profile_image: 'https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg', title: 'Discoverer of Global Treasures', description: ' Passionate travel enthusiast sharing captivating …d insider tips to inspire unforgettable journeys.', author: {…}}
// 2
// : 
// {cover_image: 'https://i.ibb.co/MRFZT7G/pexels-pixabay-356056.jpg', profile_image: 'https://i.ibb.co/wYxp7d6/pexels-spencer-selover-428328.jpg', title: 'Innovative Fashion Design Luminary', description: 'Innovative fashion designer with a keen eye for detail and a passion for pushing boundaries.', author: {…}}
