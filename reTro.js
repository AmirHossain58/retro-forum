let cardContainer =document.getElementById('card-container');
const loading=(isLoading)=>{
    const loadingS= document.getElementById('loading');
    if(isLoading===true){
        loadingS.classList.remove('hidden');
    }else{
        loadingS.classList.add('hidden');
    }
    }


const allPosts= async()  => {
    const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data =await res.json();
    const posts=data.posts;
    postsCard(posts);
    
}
const searchHereBtn=()=>{
    loading(true);
    const searchText= document.getElementById('searchHere').value;
    allPosts2(searchText);
}

const allPosts2= async(categoryName)  => {
    cardContainer.innerText='';
    const res= await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data =await res.json();
    const posts=data.posts;
    postsCard(posts);
}


const postsCard=(posts)=>{
    loading(true);
    posts.forEach(post => {
      const  div=document.createElement('div');
      
      div.innerHTML=`
      <div class="bg-[#797DFC1A] w-full flex flex-col lg:flex-row p-3  lg:p-10 gap-6 rounded-3xl border-2 border-[#797DFC]">
      <div   class="w-[72px] h-[72px] rounded-xl bg-white relative">
      <img class="rounded-3xl" src="${post.image}" alt="">
          <div id="icons" class="absolute -top-[5%] -right-[2%] "><i class="fa-solid fa-circle ${post.isActive?"text-green-500" : "text-red-500"}" ></i></div>
      </div>
      <div class="space-y-4"> 
          <div class="flex gap-5 inter font-medium text-[#12132DCC]"><p># ${post.category}</p><p>Author : ${post.author.name}</p></div>
          <p class="text-lg font-bold ">${post.title}</p>
          <p class="text-[#12132D99] lg:max-w-[400px] ">${post.description}</p>
          <hr>
          <div class="flex justify-between items-center">
          <div class="flex gap-6 inter text-[#12132D99]">
              <span><i class="fa-solid fa-message"></i> ${post.comment_count}</span>
              <span><i class="fa-regular fa-eye"></i> ${post.view_count
              }</span>
              <span><i class="fa-regular fa-clock"></i><span> ${post.
                posted_time} min</span></span>
          </div>
          <div onclick="markAsRead('${post?.title}','${post?.view_count}')" class="bg-[#10B981] rounded-3xl p-1"><i class="fa-solid fa-envelope text-white"></i></div>
      </div>
      </div>
  </div>
  

      `;
      
     
      cardContainer.appendChild(div);
    });
    setTimeout(function(){ loading(false) }, 2000);
 
}
const icons=(isActive)=>{
  const icons=document.getElementById('icons');
  console.log(icons);
  if(isActive){
    icons.classList.add('text-[#10B981]');
  }else{
    icons.classList.add('text-[#FF3434]');
  }
}

const readTitelContainer=document.getElementById('read-titel-container');
let readPost=0;
const markAsRead=(title,view)=>{

const div =document.createElement('div');

div.innerHTML=`
    <div class="flex justify-between p-4 bg-white rounded-3xl">
        <p class="text-[#12132D] font-bold ">${title}</p>
        <p class="flex items-center gap-2"><i class="fa-regular fa-eye"> </i> ${view}</p>
    </div>
             `;
readTitelContainer.appendChild(div);
const read=document.getElementById('read-post').innerText=readPost+=1;
}
const latestCardContainer=document.getElementById('latestCardContainer')
const latestPosts= async()  => {
    const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data =await res.json();
    latestPostsCard(data);
}
const latestPostsCard=(posts)=>{
    posts.forEach(post => {
        const  div=document.createElement('div');
        div.innerHTML=`
  <div class="card lg:w-96 bg-base-100 border shadow-xl">
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
        `;
        latestCardContainer.appendChild(div);
})
}


latestPosts()
allPosts()
