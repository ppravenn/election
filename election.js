function abc(sdName){
$.ajax({
    type: 'GET',
    url: `https://mydocto203.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=fazXe6U3MD6kbjzaaJXMDewpUnboXf7tz8vy9feyM9u3HsTlnX5c0bLDoVAvpq33ZJEjZ9OTKVRlJrTY1OWiEA%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
    dataType: 'xml',
    beforeSend: function () {
        $('#content').append('<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i></div>')
    },
    complete: function () {
        $('#content .loading').fadeOut(500).remove()
    },
    success: function (getdata) {
        console.log(getdata)
        usedata(getdata)
    },
    error: function (xhr) {
        console.log(xhr.status + '/' + xhr.errorText)
    }
})
}
abc('서울특별시')

function usedata(data) {
    $('#content .placeList').remove()
    var elem = `<ul class="placeList">`
    $(data).find('item').each(function () {
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<p>${placeName}</p>`
        elem += `<p>${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}

$('#content .tabTit li').on('click', function () {
    var city = $(this).text()
    $('#content .placeList').remove()
    abc(city)
})