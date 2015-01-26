
(function( $ ) {
    $.fn.dynamicFileUpload = function( options ) {
		var settings = $.extend({
			// default values
			param_name: "dynamic_files",
			auto_upload: false,
			auto_upload_url: "",
			file_types: ""
		}, options );
		
		var file_container_str = '<div class="kdm_dynamic_file_container" id="dynamicFileUpload_file_container"></div>';
		this.append( file_container_str );
		
		var btn_add_new = '<input type="button" id="dynamicFileUpload_add_new_btn" class="btn blue start kdm_dynamic_file_add_new_button" value="Yeni Dosya Ekle" />';
		this.append( btn_add_new );
		
		$( "#dynamicFileUpload_add_new_btn" ).on( "click", function() {
			addNewFileTag( settings );
			
			$( "#dynamicFileUpload_file_container" ).last().click();
		});
		
    };
    
	function addNewFileTag( settings ) {
		var file_str = '<input type="file" name="' + settings.param_name + '[]" value="Evrak Seçin" style="display:block;" class="kdm_dynamic_file_upload" />';
		
		file_str = '\
<div class="btn btn-primary kdm_file_btn_container">\
	<span>Dosya Eklemek İçin Tıklayın</span>\
	<input type="file" name="' + settings.param_name + '[]" style="display:block;" class="kdm_dynamic_file_upload" />\
	<span class="kdm_file_info"></span>\
</div>';
		
		$( "#dynamicFileUpload_file_container" ).append( file_str );
		$( "#dynamicFileUpload_file_container input:file" ).on( "change", function() {
			console.log( this.value );
		});
	}
	
}( jQuery ));
