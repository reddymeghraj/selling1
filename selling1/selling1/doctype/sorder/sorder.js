/*cur_frm.cscript.discount=function(doc,cdt,cdn){
	var amt=parseFloat(doc.price)+parseFloat(doc.service_charge);
	var d=doc.discount/100;
	var amt1=parseFloat(amt)-parseFloat(amt*d);
	var amount=parseFloat(amt1*doc.quantity)+parseFloat(doc.shipment_charge);
	cur_frm.set_value("amount",amount);
}*/
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
cur_frm.cscript.item=function(doc,cdt,cdn){
	var d=locals[cdt][cdn];
	frappe.call({
		method:"selling1.selling1.doctype.sorder.sorder.get_item_info",
		args:{item:d.item,brand:d.brand,qt:doc.qt},
		callback:function(r){
			if(r.message){
			var doclist = frappe.model.sync(r.message);
			d.item_name = doclist[0].item_name;
			d.quantity =doclist[0].quantity;
			d.rate =doclist[0].rate;
			d.discount =doclist[0].discount;
			d.taxes = doclist[0].taxes;
			d.price=doclist[0].price;
			d.amount=doclist[0].amount;
			refresh_field('item_details');
		   }
		   else{
		   	 alert("No Item in this Supplier Quotation");
		   	 refresh_field('item_details');
		   }
		}
	});
}
cur_frm.cscript.quantity=function(doc,cdt,cdn)
{
	var d=locals[cdt][cdn];
	var qt=d.quantity;
	var price=d.price;
	var amount=qt*price;
	d.amount=amount;
	refresh_field('item_details');
}
cur_frm.cscript.date=function(doc,cdt,cdn)
{
	var d=doc.item_details;
	var len=d.length;
	var total=0;
	for(i=0;i<len;i++)
	{
		total=parseFloat(total)+parseFloat(d[i].amount);
	}
	cur_frm.set_value("total_amount",total);
}