# Admin Dashboard Design Guidelines

## Design Approach
**System**: Material Design with Carbon Design influences for data-heavy admin interface
**Justification**: Gaming analytics dashboard requires clear data hierarchy, efficient workflows, and robust component patterns. Material Design provides strong visual feedback systems while Carbon's approach to data density ensures effective information display.

## Typography System
- **Primary Font**: Inter (via Google Fonts CDN)
- **Monospace Font**: JetBrains Mono (for metrics/numbers)
- **Hierarchy**:
  - Dashboard Title: 32px/bold
  - Section Headers: 24px/semibold
  - Card Titles: 18px/semibold
  - Body Text: 14px/regular
  - Metrics/Numbers: 28px/bold monospace
  - Labels/Captions: 12px/medium

## Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12, 16 units consistently
**Grid Structure**:
- Desktop: 240px fixed sidebar + flexible content (max-w-7xl) + 300px ad sidebars (left/right)
- Tablet: Collapsible 240px sidebar + full-width content
- Mobile: Bottom nav + full-width content + 90px sticky footer ad

**Responsive Breakpoints**:
- Mobile: < 768px (single column, sticky footer ad)
- Tablet: 768-1024px (collapsible sidebar)
- Desktop: > 1024px (persistent sidebar + ad columns)

## Component Library

**Navigation Sidebar** (Desktop/Tablet):
- Fixed left sidebar with icon + label navigation items
- Sections: Dashboard, Analytics, Revenue, Users, Settings
- User profile card at bottom with avatar, name, role
- Collapse button at top-right of sidebar

**Top Bar**:
- Logo/title left-aligned
- Search bar (center on desktop, expandable icon on mobile)
- Notification bell icon, theme toggle, profile dropdown right-aligned
- Height: 64px, elevated shadow

**Dashboard Cards**:
- Elevated surfaces with 16px padding
- Header with icon + title + optional action button
- Content area with metrics/charts/tables
- Use 2-column grid on desktop (grid-cols-1 lg:grid-cols-2)
- 3-column for KPI summary cards (grid-cols-1 md:grid-cols-3)

**Metric Cards** (KPI Summary):
- Icon (Material Icons CDN) + Label + Large Number + Trend indicator
- Small sparkline chart showing trend
- Percentage change badge (up/down indicator)

**Data Tables**:
- Sticky header row
- Alternating row treatment
- Sortable columns (icon indicators)
- Row actions (kebab menu right-aligned)
- Pagination controls at bottom

**Charts/Graphs**:
- Use Chart.js or Recharts for revenue/analytics visualizations
- Line charts for trends, bar charts for comparisons
- Tooltips on hover for data points
- Responsive sizing within card containers

**Ad Placement Components**:
- Desktop: 300x600 sidebar placeholders (both sides, sticky position)
- Mobile: 320x90 sticky footer container
- Placeholder styling: dashed border with "Ad Space" label centered

**Forms** (Settings/Configuration):
- Input fields: 48px height, clear labels above
- Toggle switches for boolean settings
- Dropdown selects with chevron icons
- Primary action button: 48px height, prominent placement
- Secondary actions: ghost/outline style

**Mobile Bottom Navigation**:
- 5 primary navigation items: Home, Analytics, Revenue, Users, Settings
- Icon + label (12px) centered
- Active state indicator (underline or fill)
- Height: 64px + safe-area-inset-bottom

## Icons
**Library**: Material Icons (via Google Fonts CDN)
**Common Icons**: dashboard, analytics, payments, people, settings, notifications, search, menu, close, expand_more, trending_up, trending_down

## Images
**No Hero Image**: Admin dashboards are utility-focused and don't use hero sections.

**Avatar/Profile Images**:
- User avatars: 40px circular in top bar, 64px in sidebar profile card
- Placeholder: Initials on solid background

**Chart Placeholders**:
- Empty state illustrations for charts without data
- Simple line illustrations with "No data available" message

## Animation
**Minimal, Purposeful**:
- Sidebar slide-in/out: 200ms ease
- Card hover lift: 2px elevation increase, 150ms ease
- Loading spinners: Standard circular progress
- NO scroll animations or decorative effects

## Dark Mode Implementation
**Primary Theme**: Dark mode optimized for reduced eye strain during extended use
**Surface Hierarchy**: Use elevation through subtle variations in surface treatment rather than shadows
**Contrast Ratios**: Maintain WCAG AA standards (4.5:1 minimum for text)