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
		method:"selling1.selling1.doctype.direct_sale.direct_sale.get_item_info",
		args:{item:d.item,brand:d.brand,sqt:doc.sqt},
		callback:function(r){
			d.item_name = r.message;
			refresh_field('item_details');
		   
		}
	});
}
cur_frm.cscript.taxes=function(doc,cdt,cdn){
	var d=locals[cdt][cdn];
	var dis=d.discount/100;
	var rate=parseFloat(d.rate)-parseFloat(d.rate*dis);
	var tax=d.taxes/100;
	var price=parseFloat(rate)+parseFloat(d.rate*tax);
	var tp=price*d.quantity;
	d.price=price;
	d.amount=tp;
	refresh_field("item_details");
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
cur_frm.cscript.onload=function(doc,cdt,cdn)
{
	cur_frm.toggle_enable('cheque_no', false);
	var a=doc.customer_name;
	if(!a)
	{
		frappe.call({
			method:'selling1.selling1.doctype.direct_sale.direct_sale.get_invoice_no',
			args:{},
			callback:function(r)
			{
				cur_frm.set_value("invoice_no",r.message)
			}
		});
	}
	
}
cur_frm.cscript.payment_mode=function(doc,cdt,cdn)
{
	if(doc.payment_mode=='Cash')
	{
		cur_frm.toggle_enable('cheque_no', false);
	}
	else
	{
		cur_frm.toggle_enable('cheque_no', true);
	}
}
cur_frm.cscript.paid_amount=function(doc,cdt,cdn)
{
	var ramount=doc.total_amount-doc.paid_amount;
	cur_frm.set_value("remaining_amount",ramount);
}