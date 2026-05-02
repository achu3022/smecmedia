# Requirements Document

## Introduction

A premium cinematic multi-page website for a Graphic Design & Film Editing training institute, built with Next.js (App Router). The site targets prospective students and communicates a high-end, film-industry aesthetic inspired by movie production studios and OTT platforms. It is a full website with distinct pages — Home, Courses, individual Course Detail pages, About / Why Us, Gallery, and Contact / Enrollment — connected by a site-wide Navbar and Footer. The site showcases two flagship courses, drives enrollment, and delivers an immersive experience through 3D elements, scroll-based animations, and glassmorphism UI.

---

## Glossary

- **Website**: The Next.js App Router application being built.
- **Page**: A distinct route rendered by the Next.js App Router (e.g., `/`, `/courses`, `/about`, `/contact`).
- **Root_Layout**: The Next.js `app/layout.tsx` file that wraps every Page with the Navbar and Footer.
- **Hero_Section**: The fullscreen introductory section at the top of the Home page.
- **Courses_Section**: The section on the Home page and the `/courses` Page that displays the two training programs as Glass_Cards.
- **Course_Detail_Page**: A dedicated Page for a single course at a route such as `/courses/[slug]`.
- **Navbar**: The sticky top navigation bar rendered on every Page via the Root_Layout.
- **Footer**: The site-wide bottom section rendered on every Page via the Root_Layout.
- **Loading_Screen**: The cinematic intro animation shown before the main page content appears on first visit.
- **Scroll_Progress_Indicator**: A visual bar that tracks the user's scroll position on the current Page.
- **Film_Strip**: A decorative horizontal strip of film-frame thumbnails that animates across the screen during scroll.
- **Glass_Card**: A UI card component using glassmorphism styling (frosted glass effect, translucent background, backdrop blur).
- **Gold_Glow**: A CSS/animation effect producing a warm golden light emanation, used for highlights and hover states.
- **Parallax_Layer**: A background or foreground element that moves at a different speed than the scroll, creating depth.
- **Three_Scene**: The Three.js / React Three Fiber 3D canvas rendered inside the Hero_Section.
- **Magnetic_Button**: A CTA button that subtly follows cursor movement on hover.
- **Tilt_Card**: A card component that rotates slightly in 3D space in response to cursor position.
- **Enrollment_Form**: The contact and enrollment form on the Contact Page.
- **GSAP**: GreenSock Animation Platform, used for timeline-based and scroll-triggered animations.
- **Framer_Motion**: React animation library used for component-level transitions and interactions.
- **RTF**: React Three Fiber — a React renderer for Three.js.

---

## Requirements

### Requirement 1: Project Foundation & Tech Stack

**User Story:** As a developer, I want a well-structured Next.js App Router project with the correct dependencies, so that the codebase is maintainable and all animation and 3D features are supported across every page.

#### Acceptance Criteria

1. THE Website SHALL be built with Next.js using the App Router (`app/` directory structure).
2. THE Website SHALL use Tailwind CSS for utility-first styling.
3. THE Website SHALL integrate Framer Motion for component-level animations and transitions.
4. THE Website SHALL integrate GSAP (with ScrollTrigger plugin) for scroll-based and timeline animations.
5. THE Website SHALL integrate React Three Fiber and `@react-three/drei` for 3D scene rendering.
6. THE Website SHALL define a global CSS color palette using CSS custom properties: `--color-bg: #0B0B0B`, `--color-gold: #D4AF37`, `--color-card: #1F2937`, `--color-text: #F9FAFB`.
7. THE Website SHALL be optimized for dark mode by default, with `#0B0B0B` as the root background color.

---

### Requirement 2: Site-Wide Layout (Root Layout)

**User Story:** As a visitor, I want every page of the website to share a consistent Navbar and Footer, so that navigation and branding are always accessible regardless of which page I am on.

#### Acceptance Criteria

1. THE Root_Layout SHALL wrap every Page in the Website with the Navbar at the top and the Footer at the bottom.
2. THE Root_Layout SHALL be defined in `app/layout.tsx` and SHALL apply to all routes without exception.
3. THE Root_Layout SHALL apply the global CSS color palette and base font settings to all Pages.
4. THE Root_Layout SHALL include the Loading_Screen component so that it appears once per session regardless of the entry Page.
5. THE Root_Layout SHALL include the Scroll_Progress_Indicator so that it is visible on every Page.

---

### Requirement 3: Site-Wide Navigation (Navbar)

**User Story:** As a visitor, I want a sticky navigation bar that is accessible on every page, so that I can move between pages at any time without losing my place.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport and remain visible during scroll on every Page.
2. WHILE the user is at the top of the page (scroll position 0), THE Navbar SHALL render with a fully transparent background.
3. WHEN the user scrolls past 80px from the top, THE Navbar SHALL transition to a semi-transparent dark background (`rgba(11, 11, 11, 0.85)`) with a backdrop blur of 12px.
4. THE Navbar SHALL contain the institute name/logo on the left and navigation links ("Home", "Courses", "About", "Gallery", "Contact") on the right.
5. THE Navbar SHALL include an "Enroll Now" CTA button styled with a `#D4AF37` gold border and text that links to the `/contact` Page.
6. WHEN a Navbar link is clicked, THE Navbar SHALL navigate to the corresponding Page using Next.js client-side routing.
7. THE Navbar SHALL highlight the active Page link with a `#D4AF37` gold underline or color indicator.
8. THE Navbar SHALL collapse into a hamburger menu on viewports narrower than 768px.
9. WHEN the hamburger menu is opened, THE Navbar SHALL display navigation links in a full-width dropdown panel.

---

### Requirement 4: Site-Wide Footer

**User Story:** As a visitor, I want a footer on every page with contact details, quick links, and social media links, so that I can find key information without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL appear at the bottom of every Page via the Root_Layout.
2. THE Footer SHALL display the institute name, a short tagline, and the institute's contact details (phone number, email address, and physical address).
3. THE Footer SHALL display a "Quick Links" column containing links to all main Pages: Home, Courses, About, Gallery, and Contact.
4. THE Footer SHALL display a "Follow Us" column containing social media icon links (Instagram, YouTube, Facebook, and LinkedIn).
5. THE Footer SHALL display a copyright notice with the current year.
6. THE Footer SHALL use the glassmorphism style consistent with the rest of the Website: semi-transparent dark background and a 1px top border with `rgba(212, 175, 55, 0.3)`.
7. THE Footer SHALL be fully responsive, collapsing its columns into a single-column stacked layout on viewports narrower than 768px.

---

### Requirement 5: Loading Screen

**User Story:** As a visitor, I want to see a cinematic intro loading screen when the site first loads, so that the premium film-industry brand impression is established immediately.

#### Acceptance Criteria

1. WHEN the Website first loads in a new session, THE Loading_Screen SHALL display a full-viewport overlay before the main page content is visible.
2. THE Loading_Screen SHALL animate a logo or title text with a gold shimmer sweep effect lasting no longer than 3 seconds.
3. WHEN the loading animation completes, THE Loading_Screen SHALL fade out and reveal the main page content using a smooth opacity transition of 600ms or less.
4. THE Loading_Screen SHALL use `#0B0B0B` as its background color and `#D4AF37` as its primary accent color.
5. IF the user has already visited the Website in the same browser session, THEN THE Loading_Screen SHALL skip the animation and display the page content immediately.

---

### Requirement 6: Home Page (`/`)

**User Story:** As a visitor landing on the home page, I want a cinematic, immersive introduction to the institute with clear calls to action, so that I immediately understand the brand and know where to go next.

#### Acceptance Criteria

1. THE Home Page SHALL be served at the route `/`.
2. THE Home Page SHALL contain, in order: the Hero_Section, a Courses preview section, a "Why Choose Us" section, a Film_Strip scroll effect section, and a Testimonials preview section.
3. THE Home Page SHALL include a final CTA banner above the Footer with the headline "Ready to Start Your Cinematic Journey?" and an "Enroll Now" button linking to `/contact`.

---

### Requirement 7: Cinematic Hero Section (Home Page)

**User Story:** As a visitor, I want a fullscreen cinematic hero section with 3D elements and animated text, so that I immediately understand the premium quality of the institute.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy 100% of the viewport height (`100vh`) on initial load.
2. THE Hero_Section SHALL render a Three_Scene containing at least three floating 3D objects representing film production (e.g., camera, film reel, clapperboard).
3. WHILE the Three_Scene is active, THE Three_Scene SHALL animate the 3D objects with a continuous slow floating motion (sinusoidal Y-axis oscillation).
4. THE Hero_Section SHALL display a film grain or particle overlay effect covering the full background.
5. THE Hero_Section SHALL display the headline: "Create. Edit. Dominate the Screen 🎬" using a large serif or cinematic display font.
6. THE Hero_Section SHALL display the subheadline: "Master Graphic Design, Film Editing & AI-powered Post Production".
7. THE Hero_Section SHALL display two CTA buttons: "Enroll Now" (primary, gold-filled) linking to `/contact`, and "View Courses" (secondary, gold-outlined) linking to `/courses`.
8. THE "Enroll Now" button and "View Courses" button SHALL be implemented as Magnetic_Buttons that follow cursor movement within a 40px radius on hover.
9. WHEN the Home Page loads, THE Hero_Section headline and subheadline SHALL animate in using a staggered fade-up entrance with a total duration of 1200ms.
10. WHEN the user scrolls down from the Hero_Section, THE Parallax_Layer elements in the Three_Scene SHALL shift position at 60% of the scroll speed, creating a depth parallax effect.
11. WHEN the user scrolls down from the Hero_Section, THE headline text SHALL display a gold light sweep animation triggered by the scroll position.
12. THE Hero_Section SHALL display a scroll indicator (animated chevron or text "Scroll to Explore") at the bottom center.
13. THE Three_Scene SHALL reduce the number of rendered 3D objects to one on viewports narrower than 768px to maintain performance.
14. IF a user's device does not support WebGL, THEN THE Three_Scene SHALL be replaced with a static high-quality image fallback.

---

### Requirement 8: Scroll Progress Indicator

**User Story:** As a visitor, I want a visual scroll progress indicator styled like a video timeline, so that I can see how far through the current page I have scrolled.

#### Acceptance Criteria

1. THE Scroll_Progress_Indicator SHALL be fixed to the top of the viewport, below the Navbar, on every Page.
2. WHILE the user scrolls, THE Scroll_Progress_Indicator SHALL update its width from 0% to 100% proportionally to the user's scroll position relative to the total scrollable height of the current Page.
3. THE Scroll_Progress_Indicator SHALL be styled with a `#D4AF37` gold color and a height of 3px.
4. THE Scroll_Progress_Indicator SHALL include a subtle glow effect using a gold box-shadow.

---

### Requirement 9: Courses Page (`/courses`)

**User Story:** As a prospective student, I want a dedicated courses page where I can browse both programs in detail, so that I can compare them and decide which one to pursue.

#### Acceptance Criteria

1. THE Courses Page SHALL be served at the route `/courses`.
2. THE Courses Page SHALL display a page hero banner with the heading "Our Programs" and a short description of the institute's training philosophy.
3. THE Courses Page SHALL render exactly two Glass_Cards, one for each course, in a two-column layout on viewports 768px and wider and a single-column layout on narrower viewports.
4. THE Glass_Card for Course 1 SHALL display: title "AI Integrated Graphic Designing & Video Editing", duration "7 Months", original fee "₹90,000", offer fee "₹75,000 / ₹70,000", eligibility "Plus Two and Above", and a short course description.
5. THE Glass_Card for Course 2 SHALL display: title "Master Program in Film Editing & Post Production", duration "12 Months", original fee "₹1,50,000", offer fee "₹1,25,000 / ₹1,20,000", eligibility "Plus Two and Above", and a short course description.
6. WHEN a user hovers over a Glass_Card, THE Glass_Card SHALL display a Gold_Glow border effect using a `#D4AF37` box-shadow.
7. WHEN a user hovers over a Glass_Card, THE Glass_Card SHALL apply a Tilt_Card 3D rotation effect of up to 10 degrees on the X and Y axes based on cursor position.
8. THE Glass_Card SHALL use a glassmorphism style: semi-transparent background (`rgba(31, 41, 55, 0.6)`), backdrop blur of 16px, and a 1px border with `rgba(212, 175, 55, 0.3)`.
9. THE Glass_Card SHALL display the original fee with a strikethrough style and the offer fee prominently highlighted in `#D4AF37`.
10. WHEN the Glass_Cards enter the viewport during scroll, THE Glass_Cards SHALL animate in with a staggered fade-up entrance using Framer_Motion.
11. EACH Glass_Card SHALL include a "View Details" button that navigates to the corresponding Course_Detail_Page, and an "Enroll Now" button that navigates to `/contact`.

---

### Requirement 10: Course Detail Pages (`/courses/[slug]`)

**User Story:** As a prospective student, I want a dedicated detail page for each course, so that I can read the full curriculum, outcomes, and fee structure before deciding to enroll.

#### Acceptance Criteria

1. THE Website SHALL provide a Course_Detail_Page for each course at a unique slug-based route (e.g., `/courses/ai-graphic-design`, `/courses/film-editing-post-production`).
2. THE Course_Detail_Page SHALL display the full course title, duration, eligibility, and fee structure at the top of the page.
3. THE Course_Detail_Page SHALL display a detailed curriculum section listing the modules or topics covered in the course.
4. THE Course_Detail_Page SHALL display a "What You Will Learn" section listing at least five key learning outcomes.
5. THE Course_Detail_Page SHALL display a "Career Opportunities" section listing at least three job roles or career paths available after completing the course.
6. THE Course_Detail_Page SHALL include a prominent "Enroll Now" Magnetic_Button that links to `/contact`.
7. THE Course_Detail_Page SHALL include a breadcrumb navigation trail (e.g., "Home > Courses > Course Title") at the top of the page content.
8. WHEN the Course_Detail_Page sections enter the viewport during scroll, THE sections SHALL animate in using Framer_Motion fade-up transitions.
9. THE Course_Detail_Page SHALL display a "Related Course" card at the bottom linking to the other course's detail page.

---

### Requirement 11: About Page (`/about`)

**User Story:** As a prospective student, I want a dedicated About page that explains the institute's story, mission, and key differentiators, so that I can build trust before enrolling.

#### Acceptance Criteria

1. THE About Page SHALL be served at the route `/about`.
2. THE About Page SHALL display a page hero banner with the headline "About Us" and a cinematic background image or gradient.
3. THE About Page SHALL display an "Our Story" section describing the institute's founding, mission, and vision in at least two paragraphs.
4. THE About Page SHALL display a "Why Choose Us" section containing exactly four benefit items: "Industry-Level Training", "Real Project Experience", "AI-Integrated Learning", and "Placement Support".
5. EACH benefit item SHALL include a relevant icon (SVG or icon library), a title, and a short description of 1–2 sentences.
6. WHEN a benefit item enters the viewport during scroll, THE benefit item SHALL animate in using a fade-up entrance with a staggered delay of 150ms between items.
7. WHEN a user hovers over a benefit item, THE benefit item SHALL display a subtle Gold_Glow background highlight.
8. THE About Page SHALL include at least one of the cinematic taglines: "From Beginner to Film Industry Ready 🎬", "Not Just Design. Cinematic Creation.", "Edit Like a Pro. Design Like a Brand.", or "Turn Creativity into Career 💰".
9. THE About Page SHALL display a "Meet the Team" or "Our Instructors" section with at least two instructor cards showing name, role, and a short bio.
10. THE About Page SHALL include a CTA section at the bottom with an "Enroll Now" button linking to `/contact`.

---

### Requirement 12: Gallery Page (`/gallery`)

**User Story:** As a prospective student, I want to see a gallery of student work and institute activities, so that I can evaluate the quality of training before enrolling.

#### Acceptance Criteria

1. THE Gallery Page SHALL be served at the route `/gallery`.
2. THE Gallery Page SHALL display a page hero banner with the heading "Student Work & Gallery".
3. THE Gallery Page SHALL display a masonry or grid layout of at least twelve image or video thumbnail items.
4. WHEN a gallery item is clicked, THE Gallery Page SHALL open a lightbox overlay displaying the full-size image or video.
5. WHEN the lightbox is open, THE Gallery Page SHALL allow the user to navigate to the next or previous item using arrow buttons or keyboard arrow keys.
6. WHEN the user presses the Escape key while the lightbox is open, THE lightbox SHALL close and return focus to the triggering gallery item.
7. THE Gallery Page SHALL include a filter bar allowing the user to filter items by category (e.g., "Graphic Design", "Film Editing", "Events").
8. WHEN a filter category is selected, THE Gallery Page SHALL display only the items matching that category using a smooth fade transition.
9. WHEN gallery items enter the viewport during scroll, THE items SHALL animate in using a staggered fade-in entrance with Framer_Motion.

---

### Requirement 13: Contact & Enrollment Page (`/contact`)

**User Story:** As a prospective student, I want a dedicated contact and enrollment page with a form, so that I can express my interest and get in touch with the institute easily.

#### Acceptance Criteria

1. THE Contact Page SHALL be served at the route `/contact`.
2. THE Contact Page SHALL display a page hero banner with the heading "Get in Touch / Enroll Now".
3. THE Contact Page SHALL display the Enrollment_Form containing the following fields: Full Name (text, required), Phone Number (tel, required), Email Address (email, required), Course of Interest (select dropdown with both course names, required), and Message (textarea, optional).
4. WHEN the user submits the Enrollment_Form with all required fields filled, THE Enrollment_Form SHALL display a success confirmation message: "Thank you! We will contact you shortly."
5. IF the user submits the Enrollment_Form with one or more required fields empty, THEN THE Enrollment_Form SHALL display inline validation error messages adjacent to each invalid field without reloading the page.
6. IF the user enters an invalid email address format, THEN THE Enrollment_Form SHALL display the error message "Please enter a valid email address" adjacent to the email field.
7. IF the user enters a phone number that is not 10 digits, THEN THE Enrollment_Form SHALL display the error message "Please enter a valid 10-digit phone number" adjacent to the phone field.
8. THE Enrollment_Form "Submit" button SHALL be implemented as a Magnetic_Button styled with the gold primary button style.
9. THE Contact Page SHALL display the institute's contact details alongside the form: phone number, email address, physical address, and a Google Maps embed or static map image.
10. THE Contact Page SHALL display social media links (Instagram, YouTube, Facebook, LinkedIn) with icon buttons.
11. WHEN the Contact Page sections enter the viewport during scroll, THE sections SHALL animate in using Framer_Motion fade-up transitions.

---

### Requirement 14: Scroll Effects & Film Strip Section (Home Page)

**User Story:** As a visitor, I want immersive scroll-based visual effects including a film strip animation on the home page, so that the site feels like an interactive cinematic experience.

#### Acceptance Criteria

1. THE Film_Strip SHALL be a horizontal band of repeating film-frame elements that scrolls horizontally across the screen as the user scrolls vertically.
2. WHEN the user scrolls through the Film_Strip section, THE Film_Strip SHALL translate horizontally at a rate proportional to vertical scroll distance, using GSAP ScrollTrigger.
3. THE Home Page SHALL include at least two Parallax_Layer elements in the scroll effects section that move at different speeds (e.g., 0.3x and 0.7x scroll speed) to create depth.
4. THE Home Page SHALL include a timeline animation element styled to resemble a video editing software timeline (horizontal track with playhead indicator) that animates as the user scrolls.
5. WHEN the timeline animation element enters the viewport, THE timeline playhead SHALL animate from left to right over a scroll distance of 300px.

---

### Requirement 15: Testimonials Section (Home Page & About Page)

**User Story:** As a prospective student, I want to read testimonials from past students, so that I can build confidence in the quality of the training before enrolling.

#### Acceptance Criteria

1. THE Home Page SHALL display a Testimonials preview section containing at least three student testimonial cards.
2. THE About Page SHALL display a full Testimonials section containing at least six student testimonial cards.
3. EACH testimonial card SHALL display the student's name, course completed, a star rating (1–5 stars), and a quote of 1–3 sentences.
4. THE testimonial cards on the Home Page SHALL be displayed in an auto-scrolling horizontal carousel that pauses on hover.
5. WHEN a testimonial card enters the viewport during scroll, THE card SHALL animate in using a Framer_Motion fade-up transition.
6. EACH testimonial card SHALL use the Glass_Card glassmorphism style consistent with the rest of the Website.

---

### Requirement 16: Gold Shimmer & Micro-Animations (Site-Wide)

**User Story:** As a visitor, I want subtle gold shimmer and micro-animation effects throughout the entire website, so that the premium brand identity is consistently reinforced on every page.

#### Acceptance Criteria

1. THE Website SHALL apply a gold shimmer animation (a moving linear gradient sweep from transparent to `rgba(212, 175, 55, 0.4)` to transparent) to section headings when they enter the viewport on any Page.
2. WHEN a CTA button is hovered, THE CTA button SHALL display a gold shimmer sweep animation across its surface lasting 600ms.
3. THE Website SHALL use smooth scrolling behavior (`scroll-behavior: smooth`) applied globally.
4. WHEN any interactive element (button, card, link) receives focus via keyboard, THE element SHALL display a visible gold-colored focus ring of at least 2px width, meeting WCAG 2.1 AA contrast requirements.
5. THE Website SHALL include a subtle animated gradient background on the `#0B0B0B` base, using very low-opacity radial gradients in gold and deep blue to add depth without distracting from content.
6. WHEN the user navigates between Pages, THE Website SHALL display a Framer_Motion page transition animation (e.g., fade or slide) lasting no more than 400ms.

---

### Requirement 17: Responsive Design & Performance (Site-Wide)

**User Story:** As a visitor on any device, I want the full website to be usable and visually impressive, so that I have the same premium experience regardless of screen size.

#### Acceptance Criteria

1. THE Website SHALL follow a mobile-first responsive design approach using Tailwind CSS breakpoints across all Pages.
2. THE Hero_Section SHALL display correctly on viewports as narrow as 320px, with font sizes and layout adapting to the screen width.
3. THE Courses Page SHALL display Glass_Cards in a single-column layout on viewports narrower than 768px and a two-column layout on viewports 768px and wider.
4. THE "Why Choose Us" section on the About Page SHALL display benefit items in a two-column grid on viewports narrower than 768px and a four-column grid on viewports 1024px and wider.
5. THE Website SHALL achieve a Lighthouse performance score of 70 or above on mobile for every Page.
6. THE Website SHALL use Next.js `Image` component for all images to enable automatic optimization and lazy loading.
7. THE Website SHALL use Next.js dynamic imports with `ssr: false` for Three_Scene and heavy animation components to prevent server-side rendering errors and reduce initial bundle size.
