in the cms -backedn need to do this
You are a senior NestJS developer. I already have a working NestJS backend with Prisma and PostgreSQL connected.

I only need a SIMPLE newsletter subscription system (no email sending for now).

---

## 🎯 Requirements

### 1. Database (Prisma)

Create a model:

model NewsletterSubscriber {
id String @id @default(uuid())
email String @unique
createdAt DateTime @default(now())
}

---

### 2. Backend (NestJS)

Create a newsletter module with:

#### POST /newsletter/subscribe

- Accept email
- Validate email
- Prevent duplicates
- Save to DB
- Return success message

#### GET /newsletter

- Return all subscribers
- This will be used for admin dashboard

---

### 3. Structure

Use proper NestJS structure:

- newsletter.module.ts
- newsletter.service.ts
- newsletter.controller.ts
- DTO for validation

Use class-validator for email validation

---

### 4. Error Handling

- If email already exists → return proper error
- Validate email format

---

### 5. Prisma Integration

Use PrismaService to:

- create subscriber
- fetch all subscribers

---

### 6. Response Format

Return clean JSON responses:
{
success: true,
message: "Subscribed successfully"
}

---

## 🚀 Output Required

Provide:

1. Prisma schema
2. DTO
3. Controller
4. Service
5. Example requests (Postman or fetch)

Keep it clean and minimal. No extra features.

after that do this footer section of the fooreignfrontend we have the newsletter subscription option integrate those endpoints created there and afte in the admin-landing do the update below

foreign cms add a newsletter tab on the sidebar and add anew page there
fetch the saved emails there with action buttons. send newsletter like wise relatiod action optios
