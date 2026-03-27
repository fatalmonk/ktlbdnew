#!/bin/bash

# KTL Textile Website - Hostinger Deployment Script
# This script prepares the website for deployment to Hostinger
# Usage: ./deploy-hostinger.sh

set -e  # Exit on any error

echo "🚀 KTL Textile Website - Hostinger Deployment Preparation"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
# Script should be run from project root (KTL Website/)
if [ ! -f "package.json" ] || [ ! -d "apps/web" ]; then
    print_error "Please run this script from the project root directory (KTL Website/)"
    exit 1
fi

print_info "Starting deployment preparation..."

# Step 1: Navigate to project directory and install dependencies
print_info "Installing dependencies..."
cd apps/web
if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_error "package.json not found in apps/web/"
    exit 1
fi

# Step 2: Build the project
print_info "Building the project for production..."
npm run build
if [ $? -eq 0 ]; then
    print_status "Project built successfully"

    # Check for Google Analytics in index.html
    if grep -q "googletagmanager.com" "dist/index.html" 2>/dev/null; then
        print_status "Google Analytics detected in build"
    else
        print_warning "Google Analytics not found in build - may need to be added to index.html"
    fi
else
    print_error "Build failed"
    exit 1
fi

# Return to root directory
cd ../..

# Step 3: Check if dist directory exists
if [ -d "dist" ]; then
    print_status "Build directory found: dist/"

    # Check for essential files
    if [ -f "dist/index.html" ]; then
        print_status "index.html found"
    else
        print_error "index.html not found in build"
        exit 1
    fi

    if [ -d "dist/assets" ]; then
        print_status "assets directory found"
    else
        print_error "assets directory not found in build"
        exit 1
    fi

    # Check file sizes
    echo ""
    print_info "Build size analysis:"
    du -sh dist/ 2>/dev/null || true
    if [ -d "dist/assets" ]; then
        du -sh dist/assets/ 2>/dev/null || true
    fi

else
    print_error "Build directory not found"
    exit 1
fi

# Return to root directory
cd ../..

# Step 4: Create deployment package
print_info "Creating deployment package..."
DEPLOY_DIR="archive/deployments/hostinger"

# Clean existing deployment directory
if [ -d "$DEPLOY_DIR" ]; then
    print_info "Cleaning existing deployment directory..."
    rm -rf "$DEPLOY_DIR"/*
fi

# Create deployment directory
mkdir -p "$DEPLOY_DIR"

print_info "Copying build files..."
cp -r apps/web/dist/* "$DEPLOY_DIR/"

# Copy .htaccess from public directory (or use the one in deployments if it exists)
if [ -f "apps/web/public/.htaccess" ]; then
    cp apps/web/public/.htaccess "$DEPLOY_DIR/" 2>/dev/null || true
    print_status ".htaccess copied from public/"
elif [ -f "archive/deployments/hostinger/.htaccess" ]; then
    print_status ".htaccess found in deployment directory"
else
    print_warning ".htaccess not found - using default from deployment directory"
fi

# Ensure critical files exist
print_info "Verifying critical files..."

# Check for robots.txt
if [ ! -f "$DEPLOY_DIR/robots.txt" ]; then
    print_warning "robots.txt not found - copying from public if available"
    if [ -f "apps/web/public/robots.txt" ]; then
        cp apps/web/public/robots.txt "$DEPLOY_DIR/"
        print_status "robots.txt copied"
    fi
fi

# Check for sitemap.xml
if [ ! -f "$DEPLOY_DIR/sitemap.xml" ]; then
    print_warning "sitemap.xml not found - copying from public if available"
    if [ -f "apps/web/public/sitemap.xml" ]; then
        cp apps/web/public/sitemap.xml "$DEPLOY_DIR/"
        print_status "sitemap.xml copied"
    fi
fi

print_status "Deployment package created in: $DEPLOY_DIR/"

# List deployment contents
echo ""
print_info "Deployment package contents:"
ls -lh "$DEPLOY_DIR/" | head -20

# Step 5: Final verification
print_info "Performing final verification..."

VERIFIED=true

# Check for essential files
ESSENTIAL_FILES=(
    "$DEPLOY_DIR/index.html"
    "$DEPLOY_DIR/assets"
    "$DEPLOY_DIR/.htaccess"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -e "$file" ]; then
        print_status "$(basename "$file") found"
    else
        print_error "$(basename "$file") not found"
        VERIFIED=false
    fi
done

# Check for optional but important files
OPTIONAL_FILES=(
    "$DEPLOY_DIR/robots.txt"
    "$DEPLOY_DIR/sitemap.xml"
)

for file in "${OPTIONAL_FILES[@]}"; do
    if [ -e "$file" ]; then
        print_status "$(basename "$file") found"
    else
        print_warning "$(basename "$file") not found (optional)"
    fi
done

if [ "$VERIFIED" = true ]; then
    print_status "✅ Deployment package is ready!"
    
    # Step 6: Display deployment instructions
    echo ""
    echo "🎯 DEPLOYMENT INSTRUCTIONS FOR HOSTINGER"
    echo "========================================"
    echo ""
    echo "1. 📁 Upload all files from '$DEPLOY_DIR/' to your 'public_html/' directory"
    echo "2. 🌐 Ensure ktlbd.com domain points to your Hostinger account"
    echo "3. 🔒 Enable SSL certificate in Hostinger control panel"
    echo "4. ✅ Test the website at https://ktlbd.com"
    echo ""
    echo "📋 Files to upload:"
    echo "   - index.html (root of public_html/)"
    echo "   - assets/ folder (with all CSS, JS, images, videos)"
    echo "   - .htaccess file (for SPA routing and optimization)"
    echo "   - robots.txt (for SEO)"
    echo "   - sitemap.xml (for SEO)"
    echo ""
    
    # List additional directories if they exist
    if [ -d "$DEPLOY_DIR/Certifications" ]; then
        echo "   - Certifications/ folder"
    fi
    if [ -d "$DEPLOY_DIR/logos" ]; then
        echo "   - logos/ folder"
    fi
    if [ -d "$DEPLOY_DIR/data" ]; then
        echo "   - data/ folder"
    fi
    
    echo ""
    echo "🔧 FTP/SFTP Details:"
    echo "   - Host: Your Hostinger FTP host"
    echo "   - Username: Your FTP username"
    echo "   - Password: Your FTP password"
    echo "   - Upload to: public_html/ directory"
    echo ""
    echo "🚀 NEXT STEPS:"
    echo "1. Open your FTP client (FileZilla, etc.)"
    echo "2. Connect to your Hostinger account"
    echo "3. Upload all files from '$DEPLOY_DIR/' to 'public_html/'"
    echo "4. Ensure file permissions are set correctly:"
    echo "   - Files: 644"
    echo "   - Folders: 755"
    echo "5. Visit https://ktlbd.com to verify deployment"
    echo ""
    echo "📞 Need help? Check docs/deployment/HOSTINGER_DEPLOYMENT.md for detailed instructions"
    echo "🚀 Your website is now ready for ktlbd.com deployment!"
else
    print_error "Deployment package verification failed"
    exit 1
fi

print_status "Deployment preparation completed successfully! 🎉"
