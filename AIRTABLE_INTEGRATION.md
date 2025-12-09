# Airtable Integration Guide

This document explains how Kreator syncs Firestore user data to Airtable, including zone assignment, referrals, and basic billing information.

---

# 1. Firestore Data Model (Relevant Fields)

The Firestore collection used is:

```
users/{userId}
```

The user document contains the fields that Airtable consumes.  
Below is an updated example including the new address fields and referral code:

```json
{
  "name": "Juan García Martínez",
  "email": "juan.garcia@example.com",
  "phone": "+34 612 345 678",

  "street_address": "Calle Mayor 123",
  "postal_code": "04001",
  "city": "Almería",
  "province_address": "Almería",
  "country": "España",

  "profession": "Arquitecto",
  "custom_profession": null,
  "nif_cif": "12345678Z",

  "role": "professional",

  "zone": {
    "region": "Andalucía",
    "province": "Almería",
    "comarca": "Valle del Almanzora"
  },

  "zone_assigned": false,
  "registration_order": 1733401211123,

  "interested_in_leadership": false,

  "status": "pending",
  "payment_status": "pending",

  "referred_by": "KR-1234",
  "auth_uid": "firebase-auth-uid",

  "registration_status": "personal_data_completed",
  "registration_step": 1,

  "created_at": "2024-11-25T10:00:00.000Z",
  "updated_at": "2024-11-25T10:00:00.000Z"
}
```

---

# 2. Airtable Setup

Airtable contains a table named:

```
Datos facturación
```

This table receives user data after the registration step has been completed.  
Airtable is used by the Product Owner to review users, validate information, and manage zone assignments.

---

# 3. Table Schema

| Field Name                  | Type              | Description |
|----------------------------|-------------------|-------------|
| Firestore ID               | Single line text  | Document ID from Firestore |
| Name                       | Single line text  | Full name |
| Email                      | Email            | User email |
| Phone                      | Phone            | User phone |
| NIF/CIF                    | Single line text  | Spanish ID |
| Profession                 | Single select     | User profession |
| Custom Profession          | Single line text  | If profession = “Otros” |
| Role                       | Single select     | professional / team_leader |
| Street Address             | Single line text  | Billing street |
| Postal Code                | Single line text  | Billing ZIP code |
| City                       | Single line text  | Billing city |
| Province (Billing)         | Single line text  | Billing province |
| Country                    | Single line text  | Usually “España” |
| Zone - Region              | Single line text  | Selected region |
| Zone - Province            | Single line text  | Selected province |
| Zone - Comarca             | Single line text  | Selected comarca |
| Zone Assigned              | Checkbox          | Whether PO has assigned a zone |
| Zone Assignment Date       | Date              | When assignment was made |
| Referral Code Used         | Single line text  | Code‐based referrals (KR-XXXX) |
| Registration Order         | Number            | Timestamp for ordering |
| Registration Date          | Date              | When signup occurred |
| Payment Status             | Single select     | pending / completed / failed |
| Interested in Leadership   | Checkbox          | Leadership interest |
| Status (User Status)       | Single select     | pending / approved / rejected |
| Stripe Customer ID         | Single line text  | Synced from Stripe webhook |
| First Payment Completed    | Checkbox          | Shown when Stripe payment succeeds |
| Subscription Status        | Single select     | activa / cancelada / error |

---

# 4. Referrals in Airtable

Airtable stores referrals under:

```
Referral Code Used → e.g., "KR-1234"
```

This code originates in Airtable (PO creates the referral codes), and users registering through a referral link automatically send the code to Firestore.  
Later it appears in Airtable for reporting and filtering.

---

# 5. Views to Create (Recommended)

### **1. Pending Zone Assignments**
- Filter: `Zone Assigned = false`
- Sort: `Registration Order (ascending)`
- Groups: `Zone - Comarca`

### **2. Billing & Address Review**
- Shows users with missing address info
- Useful before invoicing

### **3. Recently Registered**
- Sort by `Registration Date (descending)`

### **4. Referral Tracking View**
- Group by: `Referral Code Used`
- Helps PO measure referral performance

---

# 6. Integration Flow

Airtable is *not* the source of truth.  
Firestore is the canonical database.

The sync happens via **Cloud Functions**, which send and update data automatically between Firestore and Airtable.

The core logic is:

1. **User completes registration → Firestore saves data.**
2. **Cloud Function detects new user → pushes record to Airtable.**
3. **PO manages zone assignment directly from Airtable.**
4. **If Airtable changes user status, a webhook updates Firestore.**
5. **Stripe events (already implemented) update payment status in Firestore, which Airtable then receives.**

This ensures both systems remain aligned.

---

# 7. How Billing Appears in Airtable

Kreator does not issue invoices directly from Airtable,  
but Airtable stores the **billing address fields** so Product Owner can:

- Verify correct tax information  
- Export billing data to other systems (e.g., Stripe Dashboard, accounting tools)

Fields stored:

- Street Address  
- Postal Code  
- City  
- Province (Billing)  
- Country  

Stripe handles the actual payment flow, but Airtable serves as a dashboard for the PO to verify billing completeness.

---

# 8. Security Considerations

Airtable is used only for internal Product Owner workflows. 


---

# 9. Summary

- Firestore is the primary source of truth.  
- Airtable is a controlled admin UI for Product Owners.
- Address + billing fields are included in the sync.  
- Referral codes are fully supported and tracked.
- Zone assignment is manual in Airtable, then reflected back to Firestore.

This README provides a full overview of how data flows between systems and how Product Owners use Airtable to manage registrations and assignments.

