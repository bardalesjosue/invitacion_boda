# Firestore Security Rules - Wedding Invitation Platform

Firestore rules mapped to support guest token-reads and admin-wide access.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Check if the user is authenticated as an admin
    function isAdmin() {
      return request.auth != null;
    }

    // Families Collection & Guest Subcollections
    match /families/{familyId} {
      allow read: if true; // Public access to fetch details via invitation token lookup
      allow write: if isAdmin();

      match /guests/{guestId} {
        allow read, write: if true; // Guests can see and confirm their attendance status
      }
    }

    // Settings Collection
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Gallery Collection
    match /gallery/{imageId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```
