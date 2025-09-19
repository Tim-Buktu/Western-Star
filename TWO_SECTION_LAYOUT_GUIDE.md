# Two-Section News Layout - Apple Newsroom Inspired

## Overview

The Western Star news page now features a sophisticated two-section layout that mirrors Apple Newsroom's design philosophy, creating a clean separation between primary content and supplementary articles.

## Layout Structure

### Section 1: Main Mosaic Grid

**Purpose**: Primary content showcase with sophisticated Apple-inspired layouts

- **Featured Hero Article**: Full-width hero treatment for the most important story
- **Mosaic Patterns**: 5 distinct layout patterns for visual variety
- **Article Limit**: Shows 1 featured + 8 main articles (9 total)
- **Background**: Light gray (`bg-gray-50`) for subtle content separation

#### Mosaic Layout Patterns:

1. **Featured Hero**: Full-width with overlay and call-to-action
2. **Large + Medium + Medium**: Asymmetrical 8-4-4 column distribution
3. **Medium + Medium + Small**: Balanced storytelling layout
4. **Small + Large + Small**: Central focus with framing elements
5. **Four Small Grid**: Equal presentation for category content
6. **Full-Width Breaking**: Emergency news with red color scheme
7. **Three Equal**: Standard balanced fallback

### Section 2: "In the Loop" - Horizontal Scrollable

**Purpose**: Secondary content discovery with fluid horizontal browsing

- **Clean Background**: Pure white (`bg-white`) for visual distinction
- **Horizontal Cards**: 320px width (288px on mobile) with smooth scrolling
- **Article Content**: Articles 9+ from the filtered list
- **Interactive Elements**: Scroll buttons, gradient fade effects, mobile swipe hints

## Design Philosophy

### Visual Hierarchy

- **Primary Content First**: Main mosaic gets premium visual treatment
- **Secondary Discovery**: Horizontal section for exploration
- **Clear Separation**: Different backgrounds and spacing create distinct zones
- **Content Flow**: Natural progression from main stories to supplementary content

### Apple Newsroom Principles

- **Sophisticated Layouts**: Asymmetrical yet balanced design patterns
- **Premium Feel**: High-quality imagery and typography
- **Smooth Interactions**: Butter-smooth scrolling and hover effects
- **Mobile Excellence**: Touch-optimized with proper gesture support

## Responsive Design

### Desktop Experience (1024px+)

- **Main Section**: Full mosaic patterns with 12-column grid system
- **Horizontal Section**: Cards at 320px width with scroll buttons
- **Navigation**: Arrow buttons for precise content navigation
- **Spacing**: Generous gaps (24px) for premium feel

### Tablet Experience (768px+)

- **Main Section**: Simplified mosaic patterns maintain visual interest
- **Horizontal Section**: Medium-width cards (320px) with smooth scrolling
- **Touch Friendly**: All interactive elements sized for touch (44px minimum)
- **Balanced Layout**: 2-column grids where appropriate

### Mobile Experience (<768px)

- **Main Section**: Single-column progression with smart content ordering
- **Horizontal Section**: Compact cards (288px) with snap scrolling
- **Gesture Support**: Natural swipe gestures with scroll hints
- **Hidden Controls**: Arrow buttons hidden, "View All" link prominent

## Technical Implementation

### Smart Article Distribution

```javascript
// Section 1: Main Mosaic (9 articles total)
featuredArticle = filteredArticles[0]; // Hero article
mainArticles = remainingArticles.slice(0, 8); // Main grid articles

// Section 2: Horizontal Scroll (remaining articles)
horizontalArticles = remainingArticles.slice(8); // Secondary articles
```

### Horizontal Scroll Features

- **Smooth Scrolling**: CSS `scroll-behavior: smooth` with JavaScript controls
- **Snap Points**: CSS scroll-snap for precise card alignment
- **Gradient Fades**: Subtle edge gradients indicate more content
- **Performance**: Hardware-accelerated transforms and optimized animations

### Mobile Optimizations

- **Touch Scrolling**: Native momentum scrolling on mobile devices
- **Reduced Motion**: Respects user's motion preferences
- **Optimized Images**: Responsive image sizing for different viewports
- **Fast Loading**: Progressive loading with smooth placeholder transitions

## Content Management

### Article Allocation Strategy

- **Featured Selection**: First article becomes hero (can be manually curated)
- **Main Grid Balance**: 8 articles provide optimal mosaic variety
- **Horizontal Variety**: Remaining articles maintain engagement
- **Filter Preservation**: Layout adapts to search/filter results

### Content Guidelines

- **Minimum Content**: 9+ articles recommended for both sections
- **Image Quality**: High-resolution images for both sections
- **Content Variety**: Mix of article types for visual interest
- **Update Frequency**: Regular content updates maintain freshness

## Performance Considerations

### Optimized Loading

- **Lazy Loading**: Images load progressively as needed
- **Smooth Animations**: Hardware-accelerated CSS transforms
- **Efficient Scrolling**: Optimized scroll event handling
- **Mobile Performance**: Touch-optimized interactions

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all controls
- **Screen Readers**: Proper ARIA labels and semantic markup
- **Focus Management**: Clear focus indicators and logical tab order
- **Motion Sensitivity**: Reduced animation option support

## Browser Compatibility

### Modern Browser Support

- **CSS Grid**: Full support for complex layout patterns
- **Flexbox**: Horizontal scrolling container implementation
- **CSS Scroll Snap**: Smooth card snapping on supported browsers
- **Smooth Scrolling**: Enhanced experience with graceful fallbacks

### Fallback Support

- **Grid Fallbacks**: Flexbox alternatives for older browsers
- **Scroll Fallbacks**: Standard scrolling when snap isn't supported
- **Animation Fallbacks**: Static layouts when animations disabled
- **Touch Fallbacks**: Standard scrolling on older mobile browsers

This two-section layout successfully achieves the Apple Newsroom aesthetic while providing an optimal user experience across all devices. The clear separation between primary and secondary content creates a sophisticated information hierarchy that guides users naturally through the content discovery process.
