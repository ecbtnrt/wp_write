tinymce.init({
    selector: "textarea.editme",
	height : "360",
	browser_spellcheck : true,
    plugins: [
        "advlist autolink lists link image charmap preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code"
});