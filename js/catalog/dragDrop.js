$(document).ready(function() {

var dropArea = document.querySelector(".purchase__dragdrop")

var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var files;

var fileName = "Нет загруженных файлов";


if (isAdvancedUpload) {

    

    var droppedFiles = false;
    var colorStyle;
    var contentBefore;
    var amount = 0;
    var label = document.querySelector(".input__file")
    var shadowStyle

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)   
        document.body.addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName,highlight, false)
    })
      
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    dropArea.addEventListener('drop', handleDrop, false)
    
    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
   

    function highlight(e) {
        if(amount == 0){
            colorStyle = window.getComputedStyle(label,null).getPropertyValue("color")
            contentBefore = dropArea.innerHTML
        }
        dropArea.style.backgroundColor = "#E8E8EE"
        dropArea.innerHTML = '<span class="Download">Загрузить</span>'
        amount++
    }
      
    function unhighlight(e) {
        dropArea.style.backgroundColor = "white";
        dropArea.innerHTML = contentBefore
        
        amount = 0
    }

    function handleDrop(e) {
        if(fileName == "Нет загруженных файлов"){
            dt = e.dataTransfer
            files = dt.files
            files = [...files]
            
            fileName = files[0]['name']
            // alert(fileName)
            showFileName()
        }
    }


}


var input = document.querySelector("#file")
input.addEventListener('change', function(){
    
    if(fileName == "Нет загруженных файлов"){
        colorStyle = window.getComputedStyle(label,null).getPropertyValue("color")
        contentBefore = dropArea.innerHTML

        fileName = input.files[0].name
        files = input.files
        // alert(fileName)
        showFileName()
    }
})

function showFileName(){
    shadowStyle = window.getComputedStyle(dropArea,null).getPropertyValue("box-shadow")
    dropArea.style.boxShadow = "4px 4px green";
    contentBefore = dropArea.innerHTML

    setTimeout(function(){
        dropArea.style.boxShadow = shadowStyle;
    }, 1000)
    
    fileResult = '<div class="DownloadedFile"><div class="delete"></div><span class="fileName">' +
    fileName + '</span></div>'
    dropArea.innerHTML = fileResult

    document.querySelector(".delete").addEventListener('click', function () {
        returnBack()
    })

}

function returnBack() {
    fileName = "Нет загруженных файлов"
    files = [];
    
    dropArea.innerHTML = contentBefore
    
    document.querySelector('input[type=file]').value = '';
    
    input = document.querySelector("#file")
    input.addEventListener('change', function(){
    
    if(fileName == "Нет загруженных файлов"){
        colorStyle = window.getComputedStyle(label,null).getPropertyValue("color")
        contentBefore = dropArea.innerHTML

        fileName = input.files[0].name
        files = input.files
        // alert(fileName)
        showFileName()
    }
    })
}



// function inputFile(input){
//     alert(input.length)
// }

        $('#sendMail').on('click', function() {
            // var file_data = $('#file').prop('files')[0]; 
            if(files != false){
                var form_data = new FormData();

                var type = document.querySelector(".choose").textContent
    
                var dragdrop = files[0]
                
                // alert(dragdrop.name)
                
                // form_data.append('file', file_data);
    
                form_data.append('file', dragdrop); 
                form_data.append('theme', type); 
    
    
    
                // form_data.append('name', 'Kira');
                // form_data.append('phone', '87654');
                // form_data.append('company', 'Yeah');
                
    
                // alert(form_data);
                
                
                $.ajax({
                    url: 'https://cq61295.tmweb.ru/mail.php', // <-- point to server-side PHP script 
                    dataType: 'text',  // <-- what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    beforeSend: function(){
                        $("#sendMail").prop("disabled", true);
                        setTimeout(function(){
                            var success = document.querySelector('#Success')
                            success.style.opacity = "1"
                            setTimeout(function(){
                                returnBack()
                                $("#sendMail").prop("disabled", false);
                                success.style.opacity = "0"
                            }, 10000)
                        }, 1500)
                    },
                    success: function(php_script_response){
                        // alert(php_script_response); // <-- display response from the PHP script, if any
                    }
                 });
            } else {
                alert("Прикрепите файл")
            }
            
        });


});
