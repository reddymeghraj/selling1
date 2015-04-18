cur_frm.cscript.advance_amount=function(doc,cdt,cdn)
{
	var expence=parseFloat(doc.daily_charges)+parseFloat(doc.other_expences);
	var remaining_expence=expence-doc.advance_amount;
	cur_frm.set_value("remaining_expences",remaining_expence)
}
cur_frm.cscript.brand=function(doc,cdt,cdn)
{	
	var d=locals[cdt][cdn];
		 frappe.call({
			method:"purchase.purchase.doctype.material_request.material_request.get_brand_name",
			args:{ "brand" : d.brand },
			callback: function(r) {
				d.brand_name = r.message;
				refresh_field('item_details');
			}
		});
}
cur_frm.cscript.item=function(doc,cdt,cdn)
{
	var d=locals[cdt][cdn];
		 frappe.call({
			method:"purchase.purchase.doctype.material_request.material_request.get_item_name",
			args:{ "item" : d.item },
			callback: function(r) {
				d.item_name = r.message;
				refresh_field('item_details');
			}
		});
}