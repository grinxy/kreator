# Airtable Integration Guide

## Overview
This guide explains how to sync Firestore user registrations to Airtable for the Product Owner to manage zone assignments.

## Database Structure

### Firestore Collection: `users`
Each user document now includes:
- `zone_assigned` (boolean): Whether zone has been assigned to this user
- `zone_assignment_date` (timestamp): When assignment was made
- `registration_order` (number): Timestamp for "first come, first served" ordering
- `payment_status` (string): 'pending' | 'completed' | 'failed'
- `payment_id` (string): Stripe payment ID (for future use)
- `status` (string): Auto-set to 'approved'

### Example Firestore Document
```json
{
  "name": "Juan García Martínez",
  "email": "juan.garcia@example.com",
  "phone": "+34 612 345 678",
  "profession": "Arquitecto",
  "nif_cif": "12345678Z",
  "role": "professional",
  "zone": {
    "city": "Almería",
    "province": "Almería"
  },
  "zone_assigned": false,
  "registration_order": 1729900800123,
  "interested_in_leadership": false,
  "status": "approved",
  "payment_status": "pending",
  "auth_uid": "firebase-auth-uid",
  "created_at": "2024-10-25T10:00:00Z",
  "updated_at": "2024-10-25T10:00:00Z"
}
```

## Airtable Setup

### Base Structure
Create an Airtable base with a table called "User Registrations"

### Table Schema

| Field Name | Type | Description |
|------------|------|-------------|
| Firestore ID | Single line text | Document ID from Firestore |
| Name | Single line text | User's full name |
| Email | Email | User's email |
| Phone | Phone | User's phone number |
| Profession | Single select | User's profession |
| NIF/CIF | Single line text | Spanish ID |
| Role | Single select | professional / team_leader |
| Zone - City | Single line text | Selected city/comarca |
| Zone - Province | Single line text | Province |
| Zone Assigned | Checkbox | Whether zone assigned |
| Zone Assignment Date | Date | When assignment was made |
| Registration Order | Number | Timestamp for ordering |
| Registration Date | Date | When user registered |
| Payment Status | Single select | pending / completed / failed |
| Interested in Leadership | Checkbox | Leadership interest |
| Status | Single select | approved / rejected |

### Views to Create

1. **Pending Zone Assignments**
   - Filter: Zone Assigned = FALSE
   - Sort: Registration Order (ascending)
   - Groups: Zone - City

2. **By Zone**
   - Group by: Zone - City
   - Sort: Registration Order (ascending)

3. **Recently Registered**
   - Sort: Registration Date (descending)

## Integration Options

### Option 1: Firebase Extension (Easiest)
Use the official "Export Collections to Airtable" Firebase Extension:

1. Install from Firebase Console
2. Configure with Airtable API key
3. Set collection path: `users`
4. Map fields automatically

**Pros:** No code needed, automatic sync
**Cons:** Less customization

### Option 2: Cloud Function (Recommended)

Create a Cloud Function that triggers on user creation:

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Airtable from 'airtable';

admin.initializeApp();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);

export const syncToAirtable = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userId = context.params.userId;

    try {
      await base('User Registrations').create({
        'Firestore ID': userId,
        'Name': data.name,
        'Email': data.email,
        'Phone': data.phone,
        'Profession': data.profession,
        'NIF/CIF': data.nif_cif,
        'Role': data.role,
        'Zone - City': data.zone.city,
        'Zone - Province': data.zone.province,
        'Zone Assigned': data.zone_assigned || false,
        'Registration Order': data.registration_order,
        'Registration Date': data.created_at.toDate().toISOString(),
        'Payment Status': data.payment_status || 'pending',
        'Interested in Leadership': data.interested_in_leadership,
        'Status': data.status
      });

      console.log(`User ${userId} synced to Airtable`);
    } catch (error) {
      console.error('Error syncing to Airtable:', error);
    }
  });

// Also sync updates
export const updateAirtable = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const data = change.after.data();
    const userId = context.params.userId;

    try {
      // Find the Airtable record
      const records = await base('User Registrations')
        .select({ filterByFormula: `{Firestore ID} = '${userId}'` })
        .firstPage();

      if (records.length > 0) {
        await base('User Registrations').update(records[0].id, {
          'Zone Assigned': data.zone_assigned || false,
          'Zone Assignment Date': data.zone_assignment_date 
            ? data.zone_assignment_date.toDate().toISOString() 
            : undefined,
          'Payment Status': data.payment_status || 'pending',
          'Status': data.status
        });
      }

      console.log(`User ${userId} updated in Airtable`);
    } catch (error) {
      console.error('Error updating Airtable:', error);
    }
  });
```

**Setup Steps:**
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Initialize Cloud Functions
firebase init functions

# 3. Install dependencies
cd functions
npm install airtable firebase-admin firebase-functions

# 4. Set environment variables
firebase functions:config:set \
  airtable.api_key="YOUR_AIRTABLE_API_KEY" \
  airtable.base_id="YOUR_AIRTABLE_BASE_ID"

# 5. Deploy
firebase deploy --only functions
```

**Pros:** Full control, bidirectional sync possible
**Cons:** Requires coding, maintenance

### Option 3: Zapier/Make.com (No Code)
Use Zapier or Make.com to connect Firestore to Airtable:

1. Trigger: Firestore "New Document"
2. Action: Airtable "Create Record"
3. Map fields

**Pros:** No coding, visual interface
**Cons:** Monthly cost, rate limits

## Product Owner Workflow in Airtable

### Daily Tasks:

1. **Open "Pending Zone Assignments" View**
   - Grouped by Zone - City
   - Shows who registered first for each zone

2. **Assign Zones:**
   - Check the first person registered for each zone
   - Verify payment status = "completed"
   - Mark "Zone Assigned" checkbox
   - Add "Zone Assignment Date"

3. **Handle Conflicts:**
   - If multiple people want same zone, first in "Registration Order" wins
   - Contact others to offer alternative zones

### Airtable Automation (Optional):
Create automation to send email when zone is assigned:
- Trigger: When "Zone Assigned" = TRUE
- Action: Send email to user's email address

## Future: Stripe Integration

When adding Stripe payments:

1. After successful payment, update Firestore:
```typescript
await updateDoc(doc(db, 'users', userId), {
  payment_status: 'completed',
  payment_id: stripePaymentIntent.id,
  updated_at: Timestamp.now()
});
```

2. Cloud Function will automatically sync to Airtable
3. Product Owner only assigns zones to users with `payment_status = 'completed'`

## Querying Firestore for Product Owner Dashboard (Future)

If you want to build a dashboard later:

```typescript
// Get all users by zone, ordered by registration
const usersQuery = query(
  collection(db, 'users'),
  where('zone.city', '==', 'Almería'),
  where('zone_assigned', '==', false),
  where('payment_status', '==', 'completed'),
  orderBy('registration_order', 'asc')
);

const querySnapshot = await getDocs(usersQuery);
```

## Backup & Export

Always maintain Firestore as source of truth. Airtable is just a view for the Product Owner.

To export Firestore data for backup:
```bash
gcloud firestore export gs://[BUCKET_NAME]
```

## Security Rules

Update Firestore security rules to allow only admins to update zone assignments:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == resource.data.auth_uid;
      
      // Only admins can update zone assignments
      allow update: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' &&
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['zone_assigned', 'zone_assignment_date', 'updated_at']);
      
      // Creation handled by Cloud Function
      allow create: if request.auth != null;
    }
  }
}
```

## Summary

**Current Flow:**
1. ✅ User registers → Firestore (auto-approved)
2. 🔄 Cloud Function → Syncs to Airtable
3. 👤 Product Owner → Views in Airtable
4. 👤 Product Owner → Assigns zones manually
5. 🔄 Update syncs back to Firestore

**Recommendation:** Use **Option 2 (Cloud Function)** for full control and bidirectional sync.
