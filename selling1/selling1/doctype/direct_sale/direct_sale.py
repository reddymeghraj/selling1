# Copyright (c) 2013, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DirectSale(Document):
	def validate(self):
		for d in self.get('item_details'):
			query=frappe.db.sql("""select quantity from `tabStock` where warehouse=%s and brand=%s and item=%s""",(self.warehouse,d.brand,d.item))
			if query:
				c=int(query[0][0])
				d=int(d.quantity)
				if d <= c:
					pass
				else:	
					frappe.throw("Quantity available in warehouse is less than SalesOrder")
			else:
				frappe.throw("Material Not available in warehouse")
	def on_submit(self):
		for d in self.get('item_details'):
			query1=frappe.db.sql("""update `tabStock` set quantity=quantity-%s  where warehouse=%s and brand=%s and item=%s""",(d.quantity,self.warehouse,d.brand,d.item));
@frappe.whitelist()
def get_item_info(item):
	query=frappe.db.sql("""select item_name from `tabAdd Item` where  name=%s""",item)
	return query[0][0]	
@frappe.whitelist()
def get_invoice_no():
	q=frappe.db.sql("""select max(cast(invoice_no as int)) from `tabDirect Sale`""")
	if q[0][0]:
		ino=int(q[0][0])+1
	else:
		ino=1
	return ino	
		
