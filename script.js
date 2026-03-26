// console.log("hi!");
const createElement=(arr)=>{
const htmlElements =arr.map((el)=>`<span class="bt bg-[#D7E4EF] m-2">${el}</span>`);
return htmlElements.join(" ");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const managespinner=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
else{
     document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
}
};
const loadlessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json)=>displaylessons(json.data));
};
const removeactive=()=>{
    const activebuttons=document.querySelectorAll(".lesson-btn");
    // console.log(activebuttons);
    activebuttons.forEach((btn)=>btn.classList.remove("active"));

}
const loadword=(id)=>{
    managespinner(true);
const url=`https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then(res=>res.json())
.then((data)=>{
    removeactive();
    const clickbtn=document.getElementById(`lsn-btn-${id}`);
    // console.log(clickbtn);
    clickbtn.classList.add("active");
    displaywords(data.data);

});
};
const loadworddetail=async(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    const res=await fetch(url);
    const details = await res.json();
    displayworddetails(details.data);

}
// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
const displayworddetails=(word)=>{
    console.log(word);
    const detailbox=document.getElementById("details-container");
    detailbox.innerHTML=`<div >
      <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>: ${word.pronunciation})</h2>
    </div>
    <div>
      <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
    </div>
    <div>
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div>
      <h2 class="font-medium font-bangla">সমার্থক শব্দ গুলো</h2>
      <div class="">
      ${createElement(word.synonyms)}
    </div>
    </div>

   </div>
   <div class="modal-action">
      <form method="dialog" >
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn  bg-[#422AD5] text-white">Complete Learning</button>
      </form>
    </div>
  </div>`;
    document.getElementById('details_box').showModal();
};

const displaywords=(words)=>{
const wordcontainer=document.getElementById("word-container");
wordcontainer.innerHTML="";
if(words.length===0){
    wordcontainer.innerHTML=`
    <div class="text-center col-span-full space-y-6">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-gray-400 font-bngla font-medium" >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-2xl font-bold" >নেক্সট Lesson এ যান</h2>
      </div>
    `
    managespinner(false);
    return;
}

words.forEach(word => {
    // console.log(word);
    const cDiv=document.createElement("div");
    cDiv.innerHTML=`
     <div class="bg-white py-10 rounded-xl text-center shadow-sm px-3 space-y-4">
        <h2 class="font-bold text-2xl">${word.word?word.word:"শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold ">Meaning /Pronounciation</p>
        <div class="font-medium text-2xl font-bangla">"${word.meaning?word.meaning:"অর্থ পাওয়া যায়নি"} / ${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadworddetail(${word.id})" class="bg-[#1A91FF10] p-2 hover:bg-[#1A91FF60]"><i class="fa-solid fa-info"></i></button>
          <button onclick=" pronounceWord('${word.word}')" class="bg-[#1A91FF10] p-2 hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>

        </div>
       </div>
    `;
    wordcontainer.append(cDiv);
});
managespinner(false);
}
const displaylessons=(lessons)=>{
    // console.log(lessons);
    
    const levelContainer=document.getElementById("level-container");
    levelContainer.innerHTML="";
    for (let lesson of lessons) {
        // console.log(lessons);
        const cdiv=document.createElement("div");
        cdiv.innerHTML= `
        <button id="lsn-btn-${lesson.level_no}"
         onclick="loadword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button> 
        `;
        levelContainer.appendChild(cdiv);
    }
}
loadlessons();