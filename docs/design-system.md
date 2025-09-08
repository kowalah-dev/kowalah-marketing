# Kowalah Admin Portal Design System

This document describes the reusable UI components that form the foundation of Kowalah's admin portal design system. These components ensure consistency across all admin pages and should be used instead of creating custom implementations.

## Core Design System Components

### PageHeader (`components/ui/page-header.tsx`)

Unified page header component for all admin pages.

**When to use:**
- Every admin page should use PageHeader instead of custom headers
- Provides consistent navigation and page identification

**Props:**
```typescript
interface PageHeaderProps {
  title: string;                    // Main page title
  description?: string;             // Optional description/subtitle
  breadcrumbs?: Breadcrumb[];       // Navigation breadcrumbs
  badge?: BadgeProps;               // Status badges (e.g., "Beta", "Active")
  action?: React.ReactNode;         // Action buttons (e.g., "Create", "Edit")
  backLink?: {                      // Back navigation
    label: string;
    href: string;
  };
}
```

**Examples:**
```tsx
// Simple page header
<PageHeader title="Expert Requests" />

// With breadcrumbs and actions
<PageHeader
  title="Request #123"
  breadcrumbs={[
    { label: 'Expert Requests', href: '/admin/expert-requests' },
    { label: 'Request #123', current: true }
  ]}
  action={<Button>Assign Expert</Button>}
/>

// With back link (alternative to breadcrumbs)
<PageHeader
  title="Create Package"
  backLink={{ label: 'Back to Packages', href: '/admin/packages' }}
/>
```

### ContentCard (`components/ui/content-card.tsx`)

Flexible card component for main content areas, replacing custom card implementations.

**When to use:**
- Primary content containers
- List items in grids
- Form sections
- Any content that needs visual grouping

**Props:**
```typescript
interface ContentCardProps {
  title: string;                    // Card title
  description?: string;             // Optional subtitle
  children?: React.ReactNode;       // Main content
  actions?: React.ReactNode;        // Header actions
  footer?: React.ReactNode;         // Footer content
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}
```

**Examples:**
```tsx
// Basic content card
<ContentCard title="Request Details">
  <RequestForm />
</ContentCard>

// With actions and footer
<ContentCard
  title="Team Members"
  actions={<Button variant="ghost" size="sm">Add Member</Button>}
  footer={<div className="text-sm text-muted-foreground">5 active members</div>}
>
  <TeamMembersList />
</ContentCard>
```

### SectionHeader (`components/ui/section-header.tsx`)

Standardized headers for content sections within admin pages.

**Props:**
```typescript
interface SectionHeaderProps {
  title: string;                    // Section title
  description?: string;             // Optional description
  action?: React.ReactNode;         // Section-level actions
  size?: 'sm' | 'md' | 'lg';       // Size variant
  className?: string;
}
```

### EmptyState (`components/ui/empty-state.tsx`)

Consistent empty state component for when there's no data to display.

**Props:**
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;           // Custom icon (defaults based on variant)
  title: string;                    // Main message
  description?: string;             // Helpful explanation
  actions?: React.ReactNode;        // Call-to-action buttons
  variant?: 'default' | 'search' | 'error' | 'feature';
}
```

### QuotaCard (`components/ui/quota-card.tsx`)

Specialized component for displaying subscription quotas and usage limits.

**Props:**
```typescript
interface QuotaCardProps {
  title: string;                    // Quota title
  current: number;                  // Current usage
  limit: number;                    // Total limit
  period?: string;                  // Reset period
  resetDate?: string;               // Next reset date
  variant?: 'default' | 'warning' | 'danger';
  actions?: React.ReactNode;        // Actions
}
```

### StatsCard (`components/ui/stats-card.tsx`)

Component for displaying key metrics and statistics in admin dashboards.

**Props:**
```typescript
interface StatsCardProps {
  title: string;                    // Metric title
  value: string | number;           // Primary value
  change?: {                        // Optional change indicator
    value: number;
    label: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;           // Optional icon
  variant?: 'default' | 'success' | 'warning' | 'danger';
}
```

## Admin-Specific Design Patterns

### Admin Page Structure
```tsx
function AdminPage() {
  return (
    <>
      <PageHeader
        title="Expert Requests"
        description="Manage and track all expert request submissions"
        action={<Button>Create Request</Button>}
      />
      
      <div className="space-y-6">
        <SectionHeader
          title="Active Requests"
          description="Requests currently being processed"
        />
        
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {requests.map(request => (
              <ContentCard key={request.id} title={request.title}>
                <RequestPreview request={request} />
              </ContentCard>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active requests"
            description="All expert requests have been completed"
            actions={<Button>Create Request</Button>}
          />
        )}
      </div>
    </>
  );
}
```

### Dashboard Layout Pattern
```tsx
function AdminDashboard() {
  return (
    <>
      <PageHeader title="Admin Dashboard" />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Requests"
          value={127}
          change={{ value: 12, label: 'vs last month', trend: 'up' }}
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="Active Users"
          value={1234}
          change={{ value: -5, label: 'vs last week', trend: 'down' }}
          icon={<Users className="h-5 w-5" />}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContentCard title="Recent Activity">
            <ActivityFeed />
          </ContentCard>
        </div>
        
        <div className="space-y-6">
          <QuotaCard
            title="API Usage"
            current={8500}
            limit={10000}
            period="monthly"
          />
        </div>
      </div>
    </>
  );
}
```

## Design Tokens

Our admin components use standardized design tokens from `tailwind.config.ts`:

### Colors
- **Primary**: `#fa26a0` (brand pink) - Use for primary actions
- **Secondary**: `#ae10e3` (brand purple) - Use for secondary actions
- **Admin Accent**: Consider a more professional color palette for admin areas
- **Status Colors**: 
  - Success: `text-green-600`, `bg-green-50`
  - Warning: `text-yellow-600`, `bg-yellow-50`  
  - Danger: `text-red-600`, `bg-red-50`
  - Info: `text-blue-600`, `bg-blue-50`

### Spacing & Layout
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section gaps**: `space-y-6` (24px) for main content sections
- **Component gaps**: `space-y-4` (16px) for related elements
- **Grid gaps**: `gap-4` or `gap-6` for card grids

### Typography
- **Page titles**: `text-2xl sm:text-3xl font-bold`
- **Section titles**: `text-lg sm:text-xl font-semibold`
- **Card titles**: `text-base sm:text-lg font-medium`
- **Body text**: `text-sm sm:text-base`
- **Captions**: `text-xs sm:text-sm text-muted-foreground`

## Component Usage Guidelines

### 1. Always Use Design System Components
```tsx
// ✅ Good - Use PageHeader
<PageHeader title="Expert Requests" />

// ❌ Avoid - Custom headers
<div className="bg-white p-4">
  <h1 className="text-2xl">Expert Requests</h1>
</div>
```

### 2. Consistent Card Patterns
```tsx
// ✅ Good - Use ContentCard for consistent structure
<ContentCard title="Request Details">
  <RequestForm />
</ContentCard>

// ❌ Avoid - Custom card implementations
<Card>
  <CardHeader>
    <CardTitle>Request Details</CardTitle>
  </CardHeader>
  <CardContent>
    <RequestForm />
  </CardContent>
</Card>
```

### 3. Proper Empty States
```tsx
// ✅ Good - Use EmptyState component
<EmptyState
  title="No requests found"
  description="Try adjusting your filters"
  actions={<Button>Clear Filters</Button>}
/>

// ❌ Avoid - Plain text or custom empty states
<div className="text-center py-12">
  <p>No requests to display</p>
</div>
```

## Mobile Responsiveness

All components are built mobile-first with responsive design:

```tsx
// Responsive grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
// Responsive text sizing
<h1 className="text-xl sm:text-2xl lg:text-3xl">

// Mobile-friendly actions
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
```

## Accessibility

All components follow WCAG 2.1 guidelines:

- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast ratios ≥ 4.5:1
- Screen reader compatibility

## Contributing to the Design System

When adding new admin components:

1. **Follow existing patterns** - Use the same prop interfaces and naming
2. **Include TypeScript types** - All components fully typed
3. **Add documentation** - Update this file with examples
4. **Test thoroughly** - Verify responsive and accessible behavior
5. **Use design tokens** - Reference Tailwind config, not hardcoded values

This design system ensures a consistent, professional admin experience that scales with Kowalah's growth while maintaining usability and accessibility standards.