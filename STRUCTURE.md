# Project Structure

## Professional Frontend Architecture

```
KCBooking/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth routes group
│   │   ├── page.tsx             # Login page
│   │   └── register/
│   │       └── page.tsx         # Register page
│   ├── (main)/                  # Main app routes
│   │   ├── home/
│   │   │   └── page.tsx        # Home page
│   │   ├── courts/
│   │   │   └── page.tsx        # Courts list
│   │   ├── court/
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Court details
│   │   ├── booking/
│   │   │   └── page.tsx       # Booking page
│   │   ├── payment/
│   │   │   └── page.tsx       # Payment page
│   │   ├── confirmation/
│   │   │   └── page.tsx       # Confirmation page
│   │   ├── my-bookings/
│   │   │   └── page.tsx       # My bookings
│   │   ├── profile/
│   │   │   └── page.tsx       # User profile
│   │   └── terms/
│   │       └── page.tsx       # Terms & conditions
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── src/                         # Source code (organized by feature)
│   ├── components/             # Reusable components
│   │   ├── features/          # Feature-specific components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingDateSelector.tsx
│   │   │   │   ├── BookingTimeSlotGrid.tsx
│   │   │   │   └── BookingSummary.tsx
│   │   │   └── court/
│   │   │       ├── CourtCard.tsx
│   │   │       └── CourtDetails.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── ...
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useBooking.ts
│   │   ├── useAvailability.ts
│   │   ├── useUser.ts
│   │   └── ...
│   │
│   ├── contexts/               # React Context providers
│   │   ├── UserContext.tsx
│   │   └── BookingContext.tsx
│   │
│   ├── services/               # API/services layer
│   │   ├── booking.service.ts
│   │   ├── court.service.ts
│   │   ├── user.service.ts
│   │   └── api.client.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── date.utils.ts
│   │   ├── validation.utils.ts
│   │   ├── storage.utils.ts
│   │   ├── formatters.ts
│   │   ├── booking.utils.ts
│   │   └── index.ts
│   │
│   ├── types/                  # TypeScript types
│   │   ├── booking.types.ts
│   │   ├── user.types.ts
│   │   ├── court.types.ts
│   │   └── index.ts
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts
│   │
│   ├── config/                 # Configuration files
│   │   └── app.config.ts
│   │
│   └── data/                   # Mock data & fixtures
│       ├── mockData.ts
│       ├── courtsData.ts
│       └── index.ts
│
├── components/                  # Legacy components (for backward compatibility)
│   ├── auth/
│   ├── court/
│   ├── home/
│   ├── landing/
│   └── layout/
│
├── lib/                         # Legacy utilities (for backward compatibility)
│   ├── data.ts
│   └── utils.ts
│
├── types/                       # Legacy types (for backward compatibility)
│   └── index.ts
│
├── contexts/                    # Legacy contexts (for backward compatibility)
│   └── UserContext.tsx
│
├── public/                      # Static assets
│   ├── bg.mp4
│   ├── manta.jpeg
│   └── favicon.ico
│
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Architecture Principles

### 1. **Feature-Based Organization**
- Components organized by feature/domain
- Each feature has its own folder with related components, hooks, and types

### 2. **Separation of Concerns**
- **Components**: UI presentation
- **Hooks**: Business logic & state management
- **Services**: API calls & data fetching
- **Utils**: Pure utility functions
- **Types**: TypeScript definitions
- **Constants**: Configuration values

### 3. **Reusability**
- Custom hooks for shared logic
- Reusable UI components
- Utility functions for common operations

### 4. **Scalability**
- Easy to add new features
- Clear structure for team collaboration
- Type-safe with TypeScript

### 5. **Maintainability**
- Clear file organization
- Consistent naming conventions
- Separation of concerns

## Import Paths

Use path aliases configured in `tsconfig.json`:
- `@/src/...` - New organized structure
- `@/components/...` - Legacy components (backward compatibility)
- `@/lib/...` - Legacy utilities (backward compatibility)
- `@/types/...` - Type definitions
- `@/app/...` - Next.js app directory
