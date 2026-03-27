# Quick Figma MCP Setup Checklist

## ✅ Configuration Status

Your MCP configuration looks correct:
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "bunx",
      "args": ["cursor-talk-to-figma-mcp@latest"]
    }
  }
}
```

## 🔧 Next Steps

### 1. Install Bun (if not installed)
```bash
# Using npm
npm install -g bun

# Or using Homebrew (macOS)
brew install bun
```

### 2. Test MCP Server
The MCP server should start automatically when Cursor loads. Check:
- Cursor Settings → MCP Servers
- Look for "TalkToFigma" in the list
- Status should be "Connected" or "Running"

### 3. Install Figma Plugin
1. Open Figma Desktop/Web
2. Go to: **Plugins** → **Browse all plugins**
3. Search: **"Talk to Figma MCP"** or **"Cursor Figma"**
4. Click **Install**

### 4. Connect Figma Plugin
1. Open any Figma file
2. Run plugin: **Plugins** → **Talk to Figma MCP**
3. Plugin will show connection status
4. Keep plugin window open while using MCP commands

### 5. Test Connection
In Cursor, try:
```
@Figma join_channel default
@Figma get_document_info
```

## 🚨 Common Issues

**Issue:** "Request to Figma timed out"
- ✅ Solution: Make sure Figma plugin is running
- ✅ Solution: Join channel first: `join_channel default`
- ✅ Solution: Keep Figma file open

**Issue:** "Command not found: bunx"
- ✅ Solution: Install Bun or use `npx` instead:
  ```json
  "command": "npx",
  "args": ["cursor-talk-to-figma-mcp@latest"]
  ```

**Issue:** MCP server not in Cursor settings
- ✅ Solution: Restart Cursor
- ✅ Solution: Check configuration location (usually in Cursor settings, not project)
- ✅ Solution: Verify JSON syntax is correct

## 📝 Quick Commands Reference

```bash
# Join channel (required first)
join_channel default

# Get document info
get_document_info

# Get selected elements
get_selection

# Read selected design details
read_my_design

# Export selected as image
export_node_as_image format=PNG scale=2
```

## 🎯 Use Cases for KTL Website

1. **Extract Design Tokens**
   - Colors, spacing, typography from Figma
   - Sync with Tailwind config

2. **Export Assets**
   - Export logos, icons, images
   - Direct integration into project

3. **Component Specs**
   - Get exact measurements and styles
   - Implement React components accurately

4. **Design Review**
   - Pull latest design changes
   - Compare with implementation

---

**Ready to use once Figma plugin is installed!**

