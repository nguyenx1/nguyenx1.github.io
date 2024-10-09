// Hàm dùng để lấy dữ liệu thời tiết và cập nhật vào phần tử HTML
function getWeather(lat, lon, nhietdoId, rainId, buiID, locationName) {
    const apiKey = '6da6c8cd395f51d3fb87f2e71571b87c';
    const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=vi`;
    const url2 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    Promise.all([fetch(url1), fetch(url2)])
    .then(async function([response1, response2]) {
        const datathoitiet = await response1.json();
        const databui = await response2.json();
        const nhietdo = datathoitiet.main.temp;
        const rain = datathoitiet.weather[0].description;
        const bui = databui.list[0].main.aqi;

        // Cập nhật nội dung nhiệt độ với màu đỏ cho "°C" và giá trị nhiệt độ
        document.querySelector(nhietdoId).innerHTML = `Nhiệt độ bây giờ ở <span class="temp-value123">${locationName}</span> là <span class="temp-value">${nhietdo}°C</span>, ${rain}`;
        document.querySelector(buiID).innerHTML = `Chất lượng không khí ở ${locationName} đang ở <span class="temp-value">mức ${bui}</span>`;
    })
    .catch(function(error) {
        document.querySelector(nhietdoId).innerHTML = `Có lỗi xảy ra: ${error}`;
    });
}
    function currency(){
        fetch('https://api.currencyfreaks.com/latest?apikey=c0ffb7cf1a7140adb97087cf7c4bccb3')
        .then(function(travechotao){
            return travechotao.json()
        })
        .then(function(truycap){
            tigia = truycap.rates.VND       
            document.querySelector('#tigia').innerHTML = `1 USD bằng ${tigia} VND`;
            document.querySelector('form').onsubmit = function() {
            tiengi = document.querySelector('#currency').value.toUpperCase()
            quydoitigia = truycap.rates[tiengi];
            if (quydoitigia !== undefined)
            {
                quyravnd = (tigia/quydoitigia).toFixed(2);
                document.querySelector('#result').innerHTML = `1 ${tiengi} = ${quyravnd} VND`;
            }
            else{
                document.querySelector('#result').innerHTML = `Làm chóa có tiền tệ nào tên như zậy`
            }
            return false;
        }

        })
        .catch(function(biloiroi){
            document.querySelector('#tigia').innerHTML = `Tháng sau dùng tiếp nhé`
        })
    }

document.addEventListener('DOMContentLoaded', () => {
    currency();
    // Lấy thời tiết ở trọ
    getWeather(21.083722, 105.772076, '#nhietdoHN', '#rainHN','#buiHN', 'trọ');
    
    // Lấy thời tiết ở quê
    getWeather(21.586592, 105.818792, '#nhietdoTN', '#rainTN','#buiTN', 'quê');
    
});
