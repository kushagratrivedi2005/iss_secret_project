# Photo and Audio Slideshow Web Application

## Project Overview

This web application allows users to create custom video slideshows by uploading images, adding background music, and customizing video settings. The project is developed across three key milestones, focusing on comprehensive media management and user interaction.

## Milestone Features

### Milestone 1: Frontend Development

#### Image Upload
- Comprehensive image support
  - Formats: JPG, PNG
  - Drag-and-drop upload functionality
  - Multiple image upload capability
  - Interactive image preview and removal
  - Local storage of uploaded images

#### Video Customization
- Advanced photo-to-video conversion
  - Selective photo picking
  - Background music integration
  - Customizable image display duration
  - Transition effects between images
  - Resolution and quality selection

#### Preview Capabilities
- Interactive video preview
  - Real-time playback
  - Controls:
    - Play
    - Pause
    - Rewind
  - Sample video source integration

#### Output Configuration
- Resolution Options
  - 720p
  - 1080p
  - 4K
- Quality Settings
  - Low
  - Medium
  - High

### Milestone 2: Database and Backend

#### Backend Architecture
- Flask server implementation
- JWT-based authentication system
- Secure user management
- Automatic user re-authentication

#### Database Management
- CockroachDB with MySQL Connector
- User information storage
- Uploaded media metadata tracking
- Preloaded audio library
- Advanced media search functionality

### Milestone 3: Python Processing

#### Media Conversion Capabilities
- Automated image-to-video conversion
- Flexible audio integration
- Dynamic image transition effects
- Multi-audio support
- Background processing capabilities

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT (Flask-JWT-Extended)
- **Database**: CockroachDB with MySQL Connector
- **Security**: Werkzeug password hashing

## Prerequisites

- Python 3.x
- Flask
- Flask-JWT-Extended
- Flask-MySQLDB
- Werkzeug

## Installation

1. Clone the repository:
```bash
git clone <repository_url>
cd <project_directory>
```

2. Install required dependencies:
```bash
pip install flask flask-jwt-extended flask-mysqldb werkzeug
```

## Configuration

1. Set a secret key in `app.py`:
```python
app.secret_key = 'your_unique_secret_key'
```

2. Ensure the following files are in place:
- Database configuration files
- `html_sites/` directory with HTML templates
- `static/` directory for CSS, JS, and media files

## Database Utility Functions

### Database Connection
```python
def get_db():
    return MySQL(current_app)

def execute_query(query, args=None, fetch_one=False):
    db = get_db()
    cursor = db.connection.cursor()
    cursor.execute(query, args)
    if fetch_one:
        data = cursor.fetchone()
    else:
        data = cursor.fetchall()
    cursor.close()
    return data
```

## Running the Application

```bash
python app.py
```

Navigate to `http://localhost:5000` in your web browser.

## Deployment

Live Website: [https://aks-slideshow.onrender.com/registration](https://aks-slideshow.onrender.com/registration)

### Deployment Platform
- Hosted on Render.com
- Ensures scalable web application deployment

## Authentication

### User Login
- Access login page at `/login`
- Create account via `/registration`

### Admin Login
- Access admin page at `/admin_login`
- Admin password: `xyz`

## Security Features

- Password hashing with SHA-256
- JWT token-based authentication
- Secure user sessions
- Comprehensive admin user management

## Detailed Usage

1. **Image Upload**
   - Drag and drop images
   - Select multiple images simultaneously
   - Preview and remove uploaded images

2. **Video Customization**
   - Select photos for slideshow
   - Add background music
   - Configure image display duration
   - Choose transition effects

3. **Output Configuration**
   - Select video resolution
   - Set video quality
   - Preview final video output

## Known Limitations

- Limited advanced video editing capabilities
- Dependent on server-side processing

## Future Improvements

- Enhanced video editing tools
- More sophisticated transition effects
- Advanced media search functionality
- Cloud storage integration
- Expanded audio and video processing features

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
