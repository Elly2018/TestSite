// The script that response for the web page rendering
function RDonload(){
    $.getJSON("../media/image/Titlework/workheader.json", function(data){
    data = $.parseJSON(data);
    $.each(data, function(index, value){
        alert(value);
    })
    }).done(function(){
    })
    .fail(function(){
    })
}
function RDOnTItleWork(){

}