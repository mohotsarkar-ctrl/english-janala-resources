const createElement =(arr)=>{
    const htmlElements =arr.map(el=>`<span class="btn">${el}</span>`);
        return(htmlElements.join(" "));
    }
const loadLevels =()=>{
    const url ="https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res => res.json())
    .then(json =>{
        displayLevels(json.data);
    })
}
const removeActive =() =>{
    const lessonBtn =document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn => {
        btn.classList.remove("active");
    });

}
const loadWord=id=>{
    const urls =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(urls)
    .then(res =>res.json())
    .then(data =>{
        removeActive();// remove active class
        const clickBtn =document.getElementById(`show-btn-${id}`);
        clickBtn.classList.add("active"); // add active class
        displayWord(data.data);
    })
}
const loadWordDetail =async (id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res =await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}
const displayWordDetails =(word)=>{
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =`
    <div class="">
        <h1 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
      </div>
      <div class="">
        <h1 class="font-bold">Meaning</h1>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h1 class="font-bold">Example</h1>
        <p>${word.sentence}.</p>
      </div>
      <div class="">
        <h1 class="font-bold">Synonym</h1>
        <div class="">${createElement(word.synonyms)}</div>
      </div>
    
    `;
    document.getElementById("word_modal").showModal();
}
const displayWord =words =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML ="";
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML =`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="text-2xl font-bold">${word.word? word.word:"শব্দ পাওয়া যায়নি"}</h2>
        <p class=" font-semibold">Meaning/Pronunciation</p>
        <span class="text-2xl font-medium text-bangla">${word.meaning?word.meaning:"অনুবাদ পাওয়া যায়নি"}/${word.pronunciation?word.pronunciation:"pronunciation পাওয়া যায়নি"}</span>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume"></i></button>
        </div>
        </div>
        `;
        wordContainer.appendChild(card);
    });
}
const displayLevels = lessons =>{
    const lessonsContainer = document.getElementById("lessons-container");
    lessonsContainer.innerHTML ="";
    for(const lesson of lessons){
        const divElement = document.createElement("div");
        divElement.innerHTML=`
            <button id="show-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `;
        lessonsContainer.appendChild(divElement);
    }
}
loadLevels();