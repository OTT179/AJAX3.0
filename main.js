// ajax1.0
// mybtn.onclick = function(){
//     let request = new XMLHttpRequest()
//     request.open('GET','/xxx')   //配置request
//     request.send()//发送请求
//     request.onreadystatechange = function() {
//         if(request.readyState === 4) {
//             if(request.status >= 200 && request.status < 300 ) {
//                 let string = request.responseText
//                 let object = window.JSON.parse(string)
//                 console.log('请求成功')
//                 console.log('请求内容：'+object.me)
//             }
//         }
//     }
// }

// ajax2.0
// window.jQuery = (nodeOrSelector) => {
//     let nodes = {}
//     nodes.addClass = function () { }
//     return nodes
// }
// window.jQuery.ajax = (url, method, body, success, fail) => {
//     let request = new XMLHttpRequest()
//     request.open(method, url)
//     for (key in body) {
//         request.setRequestHeader(key, body[key])
//     }
//     request.send()
//     request.onreadystatechange = function () {
//         if (request.readyState === 4) {
//             if (request.status >= 200 && request.status < 300) {
//                 success.call(undefined, request.responseText)
//             } else if (request.status >= 400) {
//                 fail.call(undefined, request)
//             }
//         }
//     }
// }
// mybtn.onclick = () => {
//     window.jQuery.ajax(
//         '/xxx',
//         'GET',
//         { 'Content-Type': 'x-www-form-urlencoded' },
//         (responseText) => {
//             let object = window.JSON.parse(responseText)
//             console.log('请求成功！请求内容为：' + object.me)
//         },
//         (request) => {
//             console.log('请求失败')
//         }
//     )
// }

//ajax3.0
window.jQuery = (nodeOrSelector) => {
    let nodes = {}
    nodes.addClass = function () { }
    return nodes
}
mybtn.addEventListener('click', () => {
    window.jQuery.ajax({ url: '/xxx', method: 'GET',header:{'Content-Type':'x-www-form-urlencoded'}})
    .then((responseText)=>{
            let object = window.JSON.parse(responseText)
            console.log('请求成功，请求内容为：'+ object.me)}, 
        (request)=>{console.log('请求失败')})
})

window.jQuery.ajax = ({ url, method,body,header }) => { //这里的header相当于2.0的body
    return new Promise(
        function (resolve, reject) {
            let request = new XMLHttpRequest()
            request.open(method, url)
            for(key in header) {
                request.setRequestHeader(key,header[key])
            }
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        resolve.call(undefined,request.responseText)
                    } else if (request.status >= 400) {
                        reject.call(undefined,request)
                    }
                }
            }
            request.send(body)
        }
    )


}