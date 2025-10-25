#!/bin/bash

echo "🚀 KTL Website Deployment Script"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "📦 Building locally first..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    echo "📁 Build output: dist/"
    echo "📄 Main file: dist/index.html"

    # Check if dist/index.html exists
    if [ -f "dist/index.html" ]; then
        echo "✅ dist/index.html found - build is ready"
    else
        echo "❌ Error: dist/index.html not found"
        exit 1
    fi

    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod

    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "📋 Next steps:"
        echo "   1. Check your Vercel dashboard"
        echo "   2. Test the live URL"
        echo "   3. Verify all pages work"
        echo "   4. Check React Router navigation"
    else
        echo "❌ Deployment failed. Check the error messages above."
        exit 1
    fi
else
    echo "❌ Local build failed. Fix errors before deploying."
    echo "💡 Common fixes:"
    echo "   - Run 'npm install' to install dependencies"
    echo "   - Check for TypeScript errors"
    echo "   - Verify all imports are correct"
    exit 1
fi
