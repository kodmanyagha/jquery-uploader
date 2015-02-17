
(function( $ ) {
    $.fn.dynamicFileUpload = function( options ) {
		var settings = $.extend({
			// default values
			param_name: "dynamic_files",
			auto_upload: false,
			auto_upload_url: "",
			file_types: "",
			btn_title: "Click here for select file",
			btn_delete_title: "X",
			upload_limit: -1
		}, options );
		
		var file_container_str = '<div class="kdm_dynamic_file_container" id="dynamicFileUpload_file_container"></div>';
		this.append( file_container_str );
		
		var btn_add_new = '<input type="button" id="dynamicFileUpload_add_new_btn" class="btn blue start kdm_dynamic_file_add_new_button" value="Yeni Dosya Ekle" />';
		this.append( btn_add_new );
		
		$( "#dynamicFileUpload_add_new_btn" ).on( "click", function() {
			if ( settings.upload_limit == -1 )
				addNewFileTag( settings );
			else if ( $( "#dynamicFileUpload_file_container" ).children().length < settings.upload_limit )
				addNewFileTag( settings );
			
			$( "#dynamicFileUpload_file_container" ).last().click();
		});
		
    };
    
	function addNewFileTag( settings ) {
		var id_definer = Math.round(window.performance.now() * 10000);
		var file_id = settings.param_name + id_definer;
		var file_info_id = "dfu_file_info" + id_definer;
		var span_id = "dfu_span" + id_definer;

		var file_str = '\
<div class="dfu_file_btn_container">\
	<span id="'+ span_id +'">'
	+ settings.btn_title +
	'</span>\
	<input type="file" name="' + settings.param_name + '[]" id="'+ file_id +'" class="dfu_input_file" />\
	<span class="dfu_file_info" id="'+ file_info_id +'"></span>\
</div>';
		
		$( "#dynamicFileUpload_file_container" ).append( file_str );

		$("#" + file_info_id).css("display", "none");

		$( "#" + file_id ).on( "change", function() {
			var file_name = this.value.split(/(\\|\/)/g).pop();

			console.log( this.value );
			console.log( file_name );

			$("#" + span_id).css("display", "none");
			$("#" + file_id).css("width", "0px");
			$file_info = $("#" + file_info_id);
			$file_info.css("width", "100%");
			$file_info.css("display", "block");

			var info_str = '<span class="dfu_file_name">'+ file_name +'</span>';
			info_str += '<span class="dfu_delete_line">' + settings.btn_delete_title + '</span>';

			$file_info.append( info_str );

			$(".dfu_file_btn_container span .dfu_delete_line").on("click", function(data) {
				$( this ).parent().parent().remove();
				$( "#dynamicFileUpload_add_new_btn" ).show();
			});
		});

		if ( $( "#dynamicFileUpload_file_container" ).children().length >= settings.upload_limit ) {
			$( "#dynamicFileUpload_add_new_btn" ).hide();
		}
	}
	
}( jQuery ));
