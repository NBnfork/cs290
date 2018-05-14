
document.addEventListener('DOMContentLoaded', bindPostButtons);

function bindPostButtons(){
    document.getElementById('subInput').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = document.getElementById('postInput').value;
        req.open('POST', 'https://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load' ,function(){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                document.getElementById('postReply').textContent = response.data;
            }else{
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload));
        document.getElementById('postSent').textContent = payload;
        event.preventDefault();
    })
}