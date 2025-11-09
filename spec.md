# Email365   Email Sorting Application

## Overview
A modern, minimalist email sorting application that automatically categorizes emails into predefined categories and allows users to create custom sorting rules. The application features a clean, responsive design with dark mode as the default theme.

## Core Features

### Authentication & Navigation
- User authentication system with sign-in/sign-out functionality
- Global header with clickable logo (returns to homepage)
- Pre-authentication: Sign in button, About us link, Help/Q&A link, language selector
- Post-authentication: Left sidebar navigation with collapsible functionality

### Homepage (Signed Out)
- Long, scrollable landing page with smooth anchor navigation
- Compact anchor navigation bar under hero linking to About, Use Cases, Features, FAQ, and Contact
- Optional subtle scroll progress indicator at top edge
- Section order:
  1. **HERO**: Split layout with value proposition on left, demo section on right with three input fields (subject, sender, mail content) and "Start demo" button
  2. **ABOUT**: Concise section with clear, focused description of the tool's purpose and key benefits. Brief explanation of how the application transforms email management with automatic categorization and custom rules. Clean, minimalist presentation with essential information only.
  3. **USE CASES BY ROLE**: Streamlined grid showcasing 6 professional roles (Students, Business Professionals, Educators, Legal Professionals, Recruiters, Support Teams) with clean cards containing icons, titles, brief descriptions, and simple "Learn more" links
  4. **FEATURE DEMO**: Clean showcase of core features with simple visuals: Priority Categories, Push Emergency Notification, Summary Weekly Report, Smart Rule Builder, and Advanced Search with minimal explanatory text
  5. **FAQ**: Focused accordion with 8-10 essential questions covering Getting Started, Sorting Rules, Security, and Basic Features with concise answers
  6. **SECURITY & PRIVACY**: Simple checklist highlighting key data protection measures and privacy guarantees
  7. **INTEGRATIONS**: Clean section showing supported email providers and key integrations with logos and brief descriptions
  8. **TESTIMONIALS**: Streamlined section with 3-4 brief customer testimonials including names, titles, and short quotes focused on results
  9. **FINAL CTA**: Simple call-to-action section with primary "Get Started" button and secondary "Learn More" option
  10. **FOOTER**: Clean footer with essential links: About, Help, Privacy, Terms, Contact, and social media links

### Homepage (Signed In)
- Authenticated homepage view accessible via "Homepage" link in sidebar
- Features the "Email365" logo displayed prominently above the toggle section, positioned outside and separate from the bordered toggle box
- Logo is significantly larger and more visually prominent with increased size, while the company name remains at its current size for visual balance
- Entire homepage section (including the large Email365 logo, company name, and VPN-style toggle box) is shifted significantly further to the right to be visually centered and balanced relative to the sidebar and the rest of the page
- Layout adjustment maintains clean, centered appearance on both desktop and tablet breakpoints without introducing horizontal scroll or overflow
- Large, visually prominent VPN-style On/Off toggle button positioned further to the right and visually centered in the main content area next to the sidebar
- Toggle button is placed inside a visually distinct bordered box section for clear separation from the branding above and rest of the content
- Toggle button is longer and more prominent with a large white circle (toggle thumb) that closely matches the style of the NextDNS mobile app
- When toggled "on," the white circle animates smoothly to the right, and the button background turns blue
- Toggle button is appropriately sized (large but not overwhelming) with smooth animation and clear visual feedback for both On/Off states
- When toggle is off, displays "automations are currently inactive" message
- **FIXED TOGGLE FUNCTIONALITY**: Toggle must work reliably in both directions (ON to OFF and OFF to ON) with proper state management, immediate UI updates, and consistent backend synchronization. Toggle state changes must be handled with robust error handling and proper async operations to ensure the UI and backend remain synchronized at all times.
- Toggle animation must be smooth and responsive with immediate visual feedback when clicked, properly reflecting the current state
- Toggle is only visible on the authenticated Homepage view, not on other application pages
- Overall layout remains clean, centered, and visually appealing with clear separation between branding and toggle functionality
- Maintains clean, minimalist, and accessible design consistent with the rest of the application

### Hero Section Value Proposition
- Left-side bullet points include "Sort emails based on your categories"
- Additional concise bullet points about key email management benefits
- Maintains minimalist, accessible design with dark mode as default

### Main Application Interface
- Left sidebar with increased width and prominent appearance
- Sidebar structure (top to bottom):
  - Header area
  - Utilities section directly under header: Homepage, Settings, Help, Language selector
  - Email categories navigation (clean placeholder or empty state)
  - Bottom footer: Light mode toggle (dark as default), logout button only
- Two-pane main content: email list (left) and email preview (right)
- Top utility bar with search, filters, sort options, and bulk actions
- **Layout Requirements**: No horizontal scrollbars or overflow in sidebar and main content areas on all screen sizes. Proper CSS overflow properties to prevent horizontal scrolling on login and authenticated pages.

### Email Management
- Email list with sender details, subject, snippet, timestamp, and badges
- Email preview with header, action bar, formatted body, and attachments
- Built-in email categories with distinctive visual indicators
- Manual email categorization via drag-and-drop to sidebar categories

### Sorting Rules System
- Rule builder interface with conditions and actions
- Drag-and-drop rule reordering
- Rule conflict warnings and testing functionality
- Automatic rule suggestions when manually categorizing emails

### Push Notifications
- Emergency notification system that detects urgent messages (e.g., problems at home)
- Instant push notifications sent to user's phone for urgent emails
- Configurable notification settings and criteria

### Weekly Reports
- Automated weekly summary generation of inbox activity
- Highlights of important emails and activity patterns
- Delivered via email or in-app notification

### Settings & Configuration
- Tabbed settings interface: General, Categories & Labels, Rules, Notifications, Appearance, Privacy
- Dark/light mode toggle (dark as default for all users)
- Language selection (minimum 3 languages)
- Category and label management with custom category preferences section
- Custom email categories management with suggested categories (Priority, Personal Finance, Admin, Newsletter, Spam, Social, Updates)
- Add, edit, and remove functionality for custom categories
- Push notification preferences and emergency criteria configuration
- **Link Account Section**: In the General tab, immediately after the email field, displays a "Link Account" section with Google logo that allows users to simulate linking their Google account. When clicked, the Google logo is replaced with an "Unlink" button. Clicking "Unlink" returns to the initial state with the Google logo. The UI clearly reflects the linked/unlinked state with responsive visual feedback, but performs no real OAuth authentication.
- **Automatic Saving**: All changes to user preferences, categories, and account linking are saved automatically without requiring a "Save Changes" button. Changes are persisted immediately with inline feedback to confirm successful updates.

### Help & Support
- Searchable Q&A page with accordion-style answers
- Question categories and contact support option

### Theme & Accessibility
- Default dark mode theme for all users on first render
- Theme toggle only available in signed-in sidebar footer
- Use Cases and Feature Demo sections render in dark mode with accessible contrast
- FAQ uses searchable, keyboard-accessible accordions
- Application content language: English

### Responsive Design
- Desktop: Full two-pane layout with wider, more prominent sidebar
- Tablet: Collapsible sidebar and preview drawer
- Mobile: Single column layout with persistent logo
- **Critical**: No horizontal overflow or scrollbars on any screen size, with proper CSS overflow handling in AppSidebar, AppLayout, and global styles

## Backend Data Storage
- User accounts and authentication data
- Email data and metadata
- User-created sorting rules and conditions
- Email categorization history
- User preferences and settings (including theme preference)
- Custom categories and labels
- User's preferred email categories and custom category definitions
- Push notification preferences and device tokens
- Weekly report generation data and delivery preferences
- Newsletter subscription data and preferences
- Contact form submissions and support tickets
- User testimonials and feedback data
- FAQ content and search analytics
- Integration connection status and API usage data
- Homepage toggle state for each user with reliable persistence and retrieval
- Google account link status for each user (simulated state only)

## Backend Operations
- User authentication and session management
- Email fetching and synchronization
- Rule processing and email categorization
- Email search and filtering
- Settings and preferences management with automatic saving functionality
- Custom email category management (create, read, update, delete) with immediate persistence
- Demo data generation for signed-out users
- Theme preference storage and retrieval with automatic saving
- Emergency email detection and push notification delivery
- Weekly report generation and distribution
- Push notification device registration and management
- Newsletter subscription management and email delivery
- Contact form processing and support ticket creation
- FAQ content management and search functionality
- Integration status monitoring and API management
- Testimonial and feedback collection and moderation
- **FIXED TOGGLE STATE MANAGEMENT**: Robust homepage toggle state management with comprehensive error handling, reliable save and retrieve operations, proper state synchronization between frontend and backend, immediate response to toggle changes, and fallback mechanisms for failed operations. Backend must handle toggle state updates with proper validation and error recovery.
- Google account link status management (save and retrieve simulated link state) with automatic persistence
- Real-time preference updates with immediate backend synchronization and inline user feedback
