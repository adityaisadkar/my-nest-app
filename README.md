# NestJS Learning Project

A hands-on project for learning NestJS concepts, covering controllers, services, modules, guards, pipes, middleware, exception filters, MongoDB integration, and role-based authorization.

---

## Tech Stack

- **Framework:** NestJS v11
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose + `@nestjs/mongoose`)
- **Validation:** `class-validator` + `class-transformer`
- **Config:** `@nestjs/config` (`.env` based)

---

## Project Structure

```
src/
├── main.ts                          # Bootstrap, global pipes, DNS config
├── app.module.ts                    # Root module, imports all feature modules
├── app.controller.ts                # GET /
├── app.service.ts
│
├── student/                         # In-memory CRUD (no DB)
│   ├── student.module.ts
│   ├── student.controller.ts        # Full CRUD endpoints
│   ├── student.service.ts           # In-memory array operations
│   └── student.schema.ts            # Mongoose schema (name, age, email)
│
├── new-student/                     # MongoDB-backed CRUD
│   ├── new-student.module.ts        # Imports MongooseModule, exports service
│   ├── new-student.controller.ts    # Full CRUD endpoints
│   └── new-student.service.ts       # Mongoose model operations
│
├── employee/                        # Basic GET endpoint
│   ├── employee.module.ts
│   ├── employee.controller.ts
│   └── employee.service.ts
│
├── category/                        # Static data endpoint
│   ├── category.module.ts
│   ├── category.controller.ts
│   └── category.service.ts
│
├── customer/                        # DTO validation demo
│   ├── customer.module.ts
│   ├── customer.controller.ts
│   ├── customer.service.ts
│   ├── dto/
│   │   └── create-customer.dto.ts   # @IsString, @IsNumber validators
│   └── interfaces/
│       └── customer.interface.ts
│
├── product/                         # Guard demo (AuthGuard)
│   ├── product.controller.ts
│   └── product.service.ts
│
├── user/                            # Simple controller
│   └── user.controller.ts
│
├── myname/                          # Custom pipe demo
│   └── myname.controller.ts
│
├── user-roles/                      # Role-based authorization demo
│   └── user-roles.controller.ts
│
├── exception/                       # Exception filter demo
│   └── exception.controller.ts
│
├── database/                        # Lifecycle hooks demo
│   ├── database.controller.ts
│   └── database.service.ts
│
├── env/                             # ConfigService demo
│   ├── env.controller.ts
│   └── env.service.ts
│
├── common/pipes/uppercase/          # Custom pipe
│   └── uppercase.pipe.ts
│
├── filters/http-exception/          # Custom exception filter
│   └── http-exception.filter.ts
│
├── guards/
│   ├── auth/auth.guard.ts           # Token-based auth guard
│   └── roles/                       # Role-based authorization
│       ├── roles.guard.ts
│       ├── roles.decorator.ts       # @Roles() custom decorator
│       └── roles.enmus.ts           # Role enum (User, Admin)
│
└── middleware/logger/
    └── logger.middleware.ts          # Global request logger
```

---

## Concepts Covered

### 1. Controllers, Services & Modules

| Concept | Example |
|---|---|
| Basic controller | `AppController` -- `GET /` returns a string |
| Service with DI | `AppService`, `ProductService` injected into controllers |
| Feature module | `StudentModule`, `EmployeeModule` -- encapsulates controller + service |
| Root module | `AppModule` -- imports all feature modules, registers global config |

### 2. Dependency Injection

Services are injected into controllers via constructor:

```typescript
constructor(private readonly studentService: StudentService) {}
```

### 3. DTOs & Validation

Global `ValidationPipe` in `main.ts` with `whitelist: true` and `forbidNonWhitelisted: true`:

```typescript
// customer/dto/create-customer.dto.ts
export class CreateCustomerDto {
    @IsString() name: string;
    @IsNumber() age: number;
}
```

### 4. Pipes

| Pipe | Type | Used On |
|---|---|---|
| `ValidationPipe` | Global (built-in) | All routes -- strips/validates DTOs |
| `ParseIntPipe` | Parameter-level (built-in) | `GET /exception/hello/:id` |
| `UppercasePipe` | Parameter-level (custom) | `POST /myname/custom` |

### 5. Guards

| Guard | Purpose | How it works |
|---|---|---|
| `AuthGuard` | Token-based route protection | Checks `Authorization: Bearer my-secrete-token` header |
| `RolesGuard` | Role-based authorization | Reads `x-user-role` header, matches against `@Roles()` metadata |

### 6. Middleware

`LoggerMiddleware` -- applied globally to all routes via `AppModule.configure()`:

```
[GET] - [/student]
[POST] - [/new-student]
```

### 7. Exception Filters

`HttpExceptionFilter` -- custom JSON error response format:

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-25T12:00:00.000Z",
  "path": "/exception/hello/abc",
  "message": "Validation failed (numeric string is expected)"
}
```

### 8. Custom Decorators

`@Roles(Role.Admin)` -- uses `SetMetadata` to attach role metadata, read by `RolesGuard` via `Reflector`.

### 9. Lifecycle Hooks

`DatabaseService` implements:
- `onModuleInit()` -- runs when module initializes
- `onApplicationShutdown(signal)` -- runs on app shutdown (enabled via `app.enableShutdownHooks()`)

### 10. MongoDB Integration

| Feature | Module |
|---|---|
| Global connection | `MongooseModule.forRoot(process.env.MONGO_URL!)` in `AppModule` |
| Schema definition | `Student` class with `@Schema()` and `@Prop()` decorators |
| Model injection | `@InjectModel(Student.name)` in `NewStudentService` |
| CRUD operations | `create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete` |

### 11. Role-Based Authorization

```
GET /user-roles/admin-data   -->  Requires x-user-role: admin header
GET /user-roles/user-data    -->  Public, no role required
```

### 12. Environment Config

`ConfigModule.forRoot({ isGlobal: true })` loads `.env`. Services inject `ConfigService` to read variables:

```typescript
constructor(private configService: ConfigService) {}
getDbUrl() { return this.configService.get<String>('DATABASE_URL'); }
```

---

## API Endpoints

| # | Method | Route | Description |
|---|---|---|---|
| 1 | GET | `/` | Home -- returns greeting string |
| 2 | GET | `/user` | Returns user data message |
| 3 | GET | `/product` | Get all products (requires `Authorization: Bearer my-secrete-token`) |
| 4 | GET | `/product/:id` | Get product by ID |
| 5 | GET | `/category` | Get all categories |
| 6 | GET | `/employee` | Get all employees |
| 7 | GET | `/student` | Get all students (in-memory) |
| 8 | GET | `/student/:id` | Get student by ID |
| 9 | POST | `/student` | Create student (in-memory) |
| 10 | PUT | `/student/:id` | Update student (full) |
| 11 | PATCH | `/student/:id` | Update student (partial) |
| 12 | DELETE | `/student/:id` | Delete student |
| 13 | GET | `/new-student` | Get all students (MongoDB) |
| 14 | GET | `/new-student/:id` | Get student by ID (MongoDB) |
| 15 | POST | `/new-student` | Create student (MongoDB) |
| 16 | PUT | `/new-student/:id` | Update student (full, MongoDB) |
| 17 | PATCH | `/new-student/:id` | Update student (partial, MongoDB) |
| 18 | DELETE | `/new-student/:id` | Delete student (MongoDB) |
| 19 | GET | `/customer` | Get all customers |
| 20 | POST | `/customer` | Create customer (DTO validated) |
| 21 | POST | `/myname/custom` | Submit name (auto-uppercased via custom pipe) |
| 22 | GET | `/user-roles/admin-data` | Admin-only data (requires `x-user-role: admin`) |
| 23 | GET | `/user-roles/user-data` | Public user data |
| 24 | GET | `/exception/hello/:id` | Demo exception filter + ParseIntPipe |
| 25 | GET | `/database/status` | Database connection status |
| 26 | GET | `/env` | Returns DATABASE_URL env variable |

---

## Environment Variables (.env)

```
MONGO_URL=mongodb+srv://...
JWT_SECRET=123
```

---

## Running the App

```bash
# Install dependencies
npm install

# Start in development mode
npm run start:dev

# Start in production mode
npm run start:prod
```

The app runs on `http://localhost:3000` by default (configurable via `PORT` env variable).
