let arrayHome = ["halo", "nǐ hǎo", "hola", "hello", "bonjour", "hallo", "ciao", "olá", "hej", "hei", "tungjatjeta", "marhaba", "salam", "kaixo", "demat", "zdraveĭte", "hodi", "bonghjornu", "bok", "ahoj", "goddag", "dobry dzien", "miesalmebi", "helló", "dia dhuit", "안녕하세요", "tere", "kamusta", "hyvää päivää", "שלום", "नमस्ते", "sveiki", "bongu", "नमस्ते", "سلام", "zdravo", "χαίρε", "sabaidi", "salve", "talofa", "mhoro", "szia", "chào bạn", "helo", "hela", "sawubona"];
const typeDiv = document.getElementById("type-home");
let timer;

function frameLooper() {
  if (arrayHome.length > 0) {
    timer = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * arrayHome.length);
      typeDiv.textContent = arrayHome[randomIndex];
      arrayHome.splice(randomIndex, 1);

      if (arrayHome.length === 0) {
        clearInterval(timer);
      }
    }, 1000); // 1000ms interval
  }
}

frameLooper();
