# Western Star CMS Guide

## Content Management System Features

Your Western Star website now includes a powerful Content Management System (CMS) that allows you to easily manage all website content without editing code.

### Accessing the CMS

1. **Development Mode**: Look for the red edit button (✏️) in the bottom-right corner of your website
2. **Click the button** to open the CMS admin panel

### CMS Sections

#### 1. Site Settings

- **Site Title**: Change the main website title
- **Top Banner**: Edit the announcement banner at the top of the page

#### 2. Hero Section

- **Title**: Main headline on the homepage
- **Subtitle**: Description text below the title
- **Badge**: The "Daily or every 2 days" badge (can be toggled on/off)

#### 3. Trending Topics

- **Section Title**: Change "Recent insights" to any title you want
- **Visibility Toggle**: Show/hide the entire section
- **Add Topics**: Create new trending topic cards
- **Edit Topics**: Modify existing topic cards
- **Delete Topics**: Remove unwanted topics

### Managing Trending Topics

#### Adding a New Topic

1. Go to the "Trending Topics" tab
2. Click "Add Topic" button
3. Fill in:
   - **Category**: Topic category (e.g., "APPS", "ENTERPRISE")
   - **Title**: The main headline
   - **Date**: Publication date
   - **Image URL**: Link to the topic image
   - **Featured**: Mark as featured (optional)

#### Editing Existing Topics

1. Click the edit icon (✏️) next to any topic
2. Modify the fields as needed
3. Click "Save"

#### Making Topics Less Conspicuous

The trending topics section has been redesigned to be more subtle:

- **Smaller images** (reduced from h-56 to h-40)
- **Darker background** (changed to #0a0a0a)
- **Reduced opacity** on images (60% instead of 90%)
- **Smaller text** and spacing
- **Subtle borders** and hover effects

You can also:

- **Hide the section entirely** using the visibility toggle
- **Change the section title** to something less prominent
- **Remove individual topics** that are too attention-grabbing

### Data Storage

- Content is stored in your browser's localStorage during development
- Changes persist between browser sessions
- For production, you would connect this to a real database

### Customization Tips

1. **Less Conspicuous Topics**: Use the visibility toggle or change the section title to "Recent Updates" or similar
2. **Image Selection**: Choose more subtle, professional images
3. **Category Names**: Use lowercase or more understated category names
4. **Content Strategy**: Focus on fewer, higher-quality topics

### Next Steps for Production

To make this production-ready, you would need to:

1. Connect to a database (PostgreSQL, MongoDB, etc.)
2. Add user authentication for admin access
3. Implement image upload functionality
4. Add content validation and sanitization
5. Create backup and version control for content

The CMS is designed to be user-friendly while giving you full control over your website's content presentation.
