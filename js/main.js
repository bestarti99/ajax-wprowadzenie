'use strict'

// Definicja funkcji ajax
function ajax(ajaxOptions) {

    // Opcje połączenia i jego typu, ||-inicjacja
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text',
    }

    //funkcja sprawdająca statusy
    function httpSuccess(httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 ||
                // Dotyczy przeglądarek Safari
                navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefind');
        } catch (e) {
            return false;
        }

    }

    // Utworzenie obiektu XMLHttpRequest
    var httpReq = new XMLHttpRequest();

    // Otwarcie połączenia metoda-adres-asynchronicznie?
    httpReq.open(options.type, options.url, true);

    // Iterowanie za każdym razem , kiedy zmienia się ready state - od 0 do 4
    httpReq.onreadystatechange = function () {
        // Sprawdź status połącznia - funkcja httpSuccess
        if (this.readyState == 4) {
            if (httpSuccess(this)) {

                // jęsli dane w formacie XML, to zwróć obiekt responseXML, w przeciwnym wypadku responseText (JOSN to tekst)
                var returnData = (options.dataType == 'xml') ? this.responseXML : this.responseText;

                options.onSuccess(returnData);

                httpReq = null;
            } else {
                options.onError(console.log('Błąd'));
            }
        }
    }

    httpReq.send();
}

ajax({
    type: 'GET',
    url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108',
    onError: function (msg) {
        console.log(msg);
    },
    onSuccess: function (response) {
        var jsonObj = JSON.parse(response);
        console.log(jsonObj.userId);
        console.log(jsonObj.userName);
        console.log(jsonObj.userURL);

        var userId = jsonObj.userId;
        $('#testowy').text(userId);
        document.getElementById('testowy').innerHTML = userId;

        // nadpisuje całe body i wstawia w nim element bez znaczników
        //document.write(jsonObj.userId);
    }
});