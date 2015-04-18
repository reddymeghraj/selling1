# Copyright (c) 2013, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Customer(Document):
	def validate(self):
		query=frappe.db.sql("""update `tabLead1` set status=%s where name=%s""",('open',self.from_lead));
		pass
