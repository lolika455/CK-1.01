document.addEventListener('DOMContentLoaded', function() 
{

    const startButton = document.getElementById('start-button');
    let recognition;

    function startRecognition() {
        if (!('webkitSpeechRecognition' in window)) 
            {
            alert('A hangfelismerést nem támogatja a böngésző!');
            return;
        }
        //speech-to-text alapok
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'hu-HU';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) 
        {

        //speech-to-text kisbetusre
        const speechResult = event.results[0][0].transcript.toLowerCase();
        //stt kiiratas
        document.getElementById('result').textContent = speechResult;

        //ha "főoldal"-t mond az illető
        if (speechResult.includes('főoldal')) 
        {
            //a megnyitott oldalt zarja be
            window.close('rolunktest.html');
            //nyissa meg a kivant oldalt
            window.open('proba(2).html',);
        }
        //ha "szolgáltatások"-at mond az illető
        if (speechResult.includes('szolgáltatások')) 
        {
            //a megnyitott oldalt zarja be
            window.close('rolunktest.html');
            //nyissa meg a kivant oldalt
            window.open('szolgaltatasok.html');
        }
        //ha "rólunk"-at mond az illető
        if (speechResult.includes('rólunk')) 
        {
            //a megnyitott oldalt zarja be
            window.close('proba(2).html');
            //nyissa meg a kivant oldalt
            window.open('rolunktest.html');
        }
        //ha "kapcsolatok"-at mond az illető
        if (speechResult.includes('kapcsolatok')) 
        {
            //a megnyitott oldalt zarja be
            window.close('????.html');
            //nyissa meg a kivant oldalt
            window.open('kapcsolatok.html');
        }
                };

                recognition.onerror = function(event) {
                    console.error('Speech recognition error:', event.error);
                };

                recognition.onend = function() {
                    console.log('Speech recognition service disconnected');
                };

                recognition.start();
            }

            startButton.addEventListener('click', startRecognition);

            //ha space meg van nyomva elkezd hallgatozni (WIP)
            document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                startRecognition();
            }
    });
});