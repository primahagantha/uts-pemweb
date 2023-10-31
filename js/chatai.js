document.addEventListener('DOMContentLoaded', function () {
    const inputName = document.getElementById('inputName');
    const inputAsk = document.getElementById('inputAsk');
    const buttonSubmit = document.querySelector('.button-submit');
    const balasanDiv = document.getElementById('balasan');

    buttonSubmit.addEventListener('click', function () {
        const name = inputName.value.trim();
        const question = inputAsk.value.trim();

        if (name === '' || question === '') {
            showError('Nama dan pertanyaan harus diisi.');
        } else {
            showLoading();
            const names = `Ayo Sapa si user ${name} (walau nama aneh / ngasal, tetap saja sapa namanya!), Aku Ingin Bertanya Kepada Kamu: ${question}`;
            const apiUrl = 'https://aemt.me/openai?text=' + encodeURI(names);
            const errorTimeout = setTimeout(() => {
                showError('Waktu permintaan habis. Silakan coba lagi.');
            }, 60000);

            axios.get(apiUrl)
                .then(response => {
                    clearTimeout(errorTimeout)
                    const answer = response.data.result;
                    showAnswer(answer);
                })
                .catch(error => {
                    clearTimeout(errorTimeout);
                    showError('Terjadi kesalahan dalam mengambil jawaban.');
                });
        }
    });

    function showAnswer(answer) {
        let i = 0;
        const addText = () => {
            if (i <= answer.length) {
                balasanDiv.innerHTML = answer.substring(0, i);
                i++;
                setTimeout(addText, 30); 
            } else {
                showResetButton();
            }
        };
    
        addText();
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
        resetButton.classList.add('btn', 'btn-secondary', 'mt-3', 'd-flex', 'justify-content-sm-center');
        resetButton.addEventListener('click', function () {
            inputName.value = '';
            inputAsk.value = '';
            balasanDiv.innerHTML = '<div class="border border-success p-2 mb-2">.</div>';
        });
        balasanDiv.appendChild(resetButton);
    }
});
