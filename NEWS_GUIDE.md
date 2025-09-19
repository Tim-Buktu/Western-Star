# News Section Management Guide

## Overview

The Western Star news section features a sophisticated, Apple-inspired design system that adapts to different content types and provides multiple viewing modes. This guide explains how to manage and create content for the news platform.

## Content Management

### Adding New Articles

Articles are managed through the CMS data structure in `src/utils/cms.js`. To add a new article:

1. Open `src/utils/cms.js`
2. Navigate to the `news.items` array
3. Add a new article object following the template structure

### Article Structure

```javascript
{
  id: uniqueNumber,
  type: 'article-type',
  category: "CATEGORY_NAME",
  title: "Article Title",
  summary: "Brief compelling summary...",
  content: "HTML formatted content...",
  insights: ["Key point 1", "Key point 2"],
  author: {
    name: "Author Name",
    role: "Author Role",
    avatar: "image_url"
  },
  date: "YYYY-MM-DD",
  tags: ["TAG1", "TAG2"],
  image: {
    url: "image_url",
    alt: "Image description"
  },
  views: numberValue,
  resources: [optional_resources]
}
```

## Layout System

### Article Types & Visual Impact

The system supports 10 different article types that affect layout and styling:

1. **feature-story** - Hero layout for major stories
2. **breaking-news** - Urgent news with alert styling
3. **data-story** - Analytics-focused with larger cards
4. **lifestyle-feature** - People and culture content
5. **innovation-spotlight** - Technology showcases
6. **profile-interview** - People-focused stories
7. **cultural-analysis** - Deep cultural commentary
8. **financial-deep-dive** - Finance and investment focus
9. **international-analysis** - Geopolitical coverage
10. **corporate-strategy** - Business strategy analysis

### Viewing Modes

#### 1. Mosaic Layout (Apple-inspired)

- **Featured Article**: First article displays as a large hero
- **Dynamic Sizing**: Articles get different sizes based on type
- **Visual Hierarchy**: Creates engaging, non-monotonic layouts

#### 2. Grid Layout

- **Uniform Cards**: All articles same size
- **Clean Organization**: Easy to scan
- **Traditional Blog Style**: Familiar user experience

#### 3. List Layout

- **Horizontal Cards**: Image + detailed text
- **Information Dense**: More content visible
- **Scanner Friendly**: Quick article overview

## Design Principles

### Visual Variety

The mosaic layout automatically varies card sizes:

- Breaking news gets wider cards (2 columns)
- Data stories get taller cards (2 rows)
- Regular articles follow dynamic patterns to avoid monotony

### Color System

Categories use predefined colors for consistency:

- **TECHNOLOGY**: Orange
- **POLICY & REGULATIONS**: Blue
- **GLOBAL ECONOMY**: Purple
- **FINANCIAL**: Pink
- **INNOVATION**: Teal

### Typography Hierarchy

- **Hero Articles**: 3xl-5xl font sizes
- **Standard Cards**: lg-xl font sizes
- **List Items**: lg font sizes
- **Meta Information**: xs-sm font sizes

## Content Guidelines

### Writing Style

- **Headlines**: Compelling, under 120 characters
- **Summaries**: Informative, under 300 characters
- **Content**: HTML formatted with proper headings
- **Insights**: 3-5 key bullet points

### Image Requirements

- **Hero Images**: 1200x600px minimum, 2:1 ratio
- **Thumbnails**: 400x300px minimum, 4:3 ratio
- **Author Avatars**: 150x150px, square format

### SEO Optimization

- Use descriptive alt text for all images
- Include relevant tags for each article
- Write compelling summaries for social sharing
- Maintain consistent URL structure (`/news/[id]`)

## Advanced Features

### Interactive Elements

- **Reading Progress**: Visual indicator of scroll progress
- **Social Sharing**: Built-in share functionality
- **Bookmarking**: Save articles for later
- **Related Articles**: Auto-generated based on tags

### Analytics Integration

- View count tracking
- Reading time estimation
- User engagement metrics
- Popular content identification

### Search & Filtering

- **Full-text Search**: Title, content, and tag searching
- **Category Filtering**: Filter by content type
- **Tag Filtering**: Filter by topic tags
- **Multi-filter Support**: Combine multiple filters

## Performance Considerations

### Image Optimization

- Use Unsplash URLs with optimization parameters
- Implement lazy loading for images
- Serve appropriate sizes for different viewports

### Loading States

- Skeleton screens for loading articles
- Progressive enhancement for interactions
- Graceful fallbacks for missing content

## Customization Options

### Adding New Categories

1. Update `availableCategories` in the CMS
2. Add corresponding color in `tagColorClasses`
3. Add icon mapping in `categoryIcons`
4. Update the template file

### Styling Modifications

- Colors: Update Tailwind config and CMS color mappings
- Typography: Modify font sizes in component classes
- Layout: Adjust grid systems and spacing
- Animations: Update transition durations and effects

## Maintenance Tasks

### Regular Updates

- Review and update article view counts
- Check for broken image links
- Update author information
- Refresh content tags and categories

### Content Auditing

- Remove outdated articles
- Update evergreen content
- Check internal links
- Verify resource links

## Troubleshooting

### Common Issues

1. **Images not loading**: Check URL accessibility
2. **Layout breaks**: Verify article structure
3. **Filters not working**: Check tag consistency
4. **Navigation issues**: Verify route configuration

### Debug Tools

- Use browser dev tools for layout issues
- Check console for JavaScript errors
- Verify CMS data structure
- Test responsive breakpoints

## Future Enhancements

### Planned Features

- Real-time content updates
- Advanced analytics dashboard
- Content scheduling system
- Multi-language support
- Enhanced social integration

### Scalability Considerations

- Pagination for large article lists
- Search index optimization
- CDN integration for images
- Database backend migration path

This news system provides a robust, scalable foundation for content management while maintaining the engaging, Apple-inspired design aesthetic that keeps users engaged with varied, creative layouts.
