# Copyright (c) 2013, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Sorder(Document):
	def validate(self):
		for d in self.get('item_details'):
			query=frappe.db.sql("""select quantity from `tabStock` where warehouse=%s and brand=%s and item=%s""",(self.warehouse,d.brand,d.item))[0][0]
			c=int(query)
			d=int(d.quantity)
			if query:
				if d <= c:
					pass
				else:	
					frappe.throw("Quantity available in warehouse is less than SalesOrder")
			else:
				frappe.throw ("material Not available in warehouse")
	def on_submit(self):
		for d in self.get('item_details'):
			query1=frappe.db.sql("""update `tabStock` set quantity=quantity-%s  where warehouse=%s and brand=%s and item=%s""",(d.quantity,self.warehouse,d.brand,d.item));
@frappe.whitelist()
def get_item_info(item,brand,qt):
	query=frappe.db.sql("""select item_name,quantity,rate,discount,taxes,price,amount from `tabQuotation Info` where parent=%s and brand=%s and item=%s""",(qt,brand,item),as_dict=1)
	return query	