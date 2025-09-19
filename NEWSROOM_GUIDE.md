# Newsletter Management Guide - Western Star

This guide explains how to use the new Newsroom feature and manage newsletters through the CMS.

## Accessing the Newsroom

### Public Access

- Navigate to `/newsroom` from the main navigation menu
- View the complete archive of newsletters
- Search and filter by tags, dates, and keywords
- Click on any newsletter card to read the full article

### Features

- **Search**: Find newsletters by title, content, or tags
- **Filter by Tags**: Filter by topic categories (Technology, Policy, etc.)
- **Filter by Year**: View newsletters from specific years
- **Responsive Design**: Works perfectly on all device sizes
- **Apple-Inspired Layout**: Clean, professional card-based design

## Managing Newsletters via CMS

### Accessing the CMS

1. Click the floating CMS button (pencil icon) in the bottom-right corner
2. Login with admin credentials
3. Navigate to the "Newsletters" tab

### JSON Import Feature

The most efficient way to add newsletters is through JSON import:

#### Step 1: Download Template

- Click "Download Template" to get a sample JSON file
- Use this as a reference for formatting your data

#### Step 2: Prepare Your JSON

Create a JSON file with this structure:

```json
{
  "newsletters": [
    {
      "title": "Your Newsletter Title",
      "date": "2025-09-04",
      "keyDiscussion": "Brief summary of key topics and discussion points covered in this newsletter issue.",
      "tags": ["TECHNOLOGY", "POLICY & REGULATIONS"],
      "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      "content": "<h2>Section Title</h2><p>Your newsletter content in HTML format. You can include multiple paragraphs, headings, and basic formatting.</p><h2>Another Section</h2><p>More content here...</p>",
      "newsletterUrl": "https://link-to-your-full-newsletter.com"
    },
    {
      "title": "Another Newsletter",
      "date": "2025-09-03",
      "keyDiscussion": "Description of the second newsletter...",
      "tags": ["GLOBAL ECONOMY", "CORPORATE"],
      "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
      "content": "<h2>Market Analysis</h2><p>Detailed analysis content...</p>"
    }
  ]
}
```

#### Required Fields

- **title**: Newsletter headline (string)
- **date**: Publication date in YYYY-MM-DD format (string)
- **keyDiscussion**: Summary of main topics (string)
- **tags**: Array of category tags (array of strings)

#### Optional Fields

- **image**: Featured image URL (string)
- **content**: Full newsletter content in HTML format (string)
- **newsletterUrl**: Link to full newsletter on external platform (string)

#### Step 3: Import Process

1. Drag and drop your JSON file onto the upload area, or
2. Click "Select File" to browse and choose your file
3. Click "Import" to add the newsletters
4. Check for success/error messages
5. View imported newsletters in the list below

### Available Tags

Use these predefined tags for consistent categorization:

- **POLICY & REGULATIONS** (blue)
- **INTERNATIONAL RELATIONS** (green)
- **GLOBAL ECONOMY** (purple)
- **TECHNOLOGY** (orange)
- **CORPORATE** (indigo)
- **CAREER** (yellow)
- **FINANCIAL** (pink)
- **LIFESTYLE** (cyan)
- **INNOVATION** (teal)
- **CULTURAL** (red)

### Manual Newsletter Management

- **Add Individual Newsletter**: Click "Add Newsletter" button
- **Edit Newsletter**: Click edit icon on any newsletter card
- **Delete Newsletter**: Click trash icon (requires confirmation)

## Content Best Practices

### Writing Effective Key Discussions

- Keep it concise (150-300 characters)
- Highlight the main value proposition
- Include key topics covered
- Write in an engaging, professional tone

### Image Guidelines

- Use high-quality images (minimum 1200px wide)
- Choose relevant, professional stock photos
- Maintain consistent visual style
- Ensure images are web-optimized for fast loading

### HTML Content Formatting

```html
<!-- Use these HTML tags for consistent formatting -->
<h2>Section Heading</h2>
<p>Paragraph text with clear, readable content.</p>
<h3>Subsection</h3>
<p>More detailed analysis or discussion points.</p>
<ul>
  <li>Bullet point for key insights</li>
  <li>Another important point</li>
</ul>
```

### Date Formatting

- Always use YYYY-MM-DD format (e.g., "2025-09-04")
- Ensure chronological order for better user experience
- Use actual publication dates for accurate filtering

## Troubleshooting

### Import Errors

- **"JSON must contain a newsletters array"**: Ensure your JSON has a "newsletters" key with an array value
- **"Missing required field"**: Check that all required fields (title, date, keyDiscussion, tags) are present
- **"Invalid date format"**: Use YYYY-MM-DD format for dates
- **"Tags must be an array"**: Ensure tags field contains an array of strings

### Display Issues

- **Images not showing**: Verify image URLs are accessible and use HTTPS
- **Formatting problems**: Check HTML content for proper tag closure
- **Search not working**: Ensure newsletter content is properly indexed

### Performance Tips

- Import newsletters in batches of 50-100 for better performance
- Use compressed, optimized images
- Keep HTML content clean and well-formatted
- Regular cleanup of unused newsletters

## Advanced Features

### Search Functionality

The newsroom includes powerful search that looks through:

- Newsletter titles
- Key discussion content
- Tag names
- Full article content (when available)

### Filtering Options

- **By Tags**: Filter to show only newsletters with specific topics
- **By Year**: View newsletters from specific publication years
- **Combined Filters**: Use search + tag + year filters together

### Mobile Optimization

- All newsroom features work on mobile devices
- Touch-friendly interface
- Responsive card layout
- Optimized reading experience

## Data Management

### Backup Recommendations

- Regularly export your newsletter data
- Keep master copies of JSON files
- Document your tagging strategy
- Maintain image asset library

### Migration Notes

- All data is currently stored in browser localStorage
- For production, consider database integration
- Export functionality available for data portability
- Consider automated backups for production use

## Future Enhancements

Potential upcoming features:

- Newsletter analytics
- Automated RSS feed integration
- Email template generation
- Social media sharing optimization
- Advanced search with faceted filtering
- Newsletter scheduling and publishing workflow
