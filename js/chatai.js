document.addEventListener('DOMContentLoaded', function () {
    const inputName = document.getElementById('inputName');
    const inputAsk = document.getElementById('inputAsk');
    const buttonSubmit = document.querySelector('.button-submit');
    const answerDiv = document.getElementById('answer');
    const balasanDiv = document.getElementById('balasan');


    buttonSubmit.addEventListener('click', function () {
      const name = inputName.value.trim();
      const question = inputAsk.value.trim();
  
      if (name === '' || question === '') {
        showError('Nama dan pertanyaan harus diisi.');
      } else {
        showLoading();
        const names = `Ayo Sapa si user ${name}, Aku Ingin Bertanya Kepada Kamu: ${question}` 
        const apiUrl = 'https://tools.betabotz.org/tools/openai?q=' + encodeURI(names);
  
        axios.get(apiUrl)
          .then(response => {
            const answer = response.data.result;
            simulateTyping(answer);
          })
          .catch(error => {
            showError('Terjadi kesalahan dalam mengambil jawaban.');
          });
      }
    });
  
    function simulateTyping(answer) {
      let i = 0;
      const typingInterval = setInterval(function () {
        if (i <= answer.length) {
          answerDiv.innerHTML = answer.substring(0, i);
          i++;
        } else {
          clearInterval(typingInterval);
          showResetButton();
        }
      }, 100);
    }
  
    function showLoading() {
      const loadingIcon = document.createElement('div');
      loadingIcon.classList.add('loading');
      balasanDiv.innerHTML = '';
      balasanDiv.appendChild(loadingIcon);
    }
  
    function showError(message) {
      balasanDiv.innerHTML = `<div class="border border-danger p-2 mb-2">${message}</div>`;
    }
  
    function showResetButton() {
      const resetButton = document.createElement('button');
      resetButton.innerText = 'Reset';
      resetButton.classList.add('btn', 'btn-secondary', 'mt-3');
      resetButton.addEventListener('click', function () {
        inputName.value = '';
        inputAsk.value = '';
        answerDiv.innerHTML = '<div class="border border-success p-2 mb-2">.</div>';
      });
      balasanDiv.appendChild(resetButton);
    }
  });
  