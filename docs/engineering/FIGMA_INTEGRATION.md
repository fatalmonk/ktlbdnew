# Figma Integration Setup Guide

## Overview
This guide helps you set up the Figma MCP (Model Context Protocol) integration for Cursor, allowing you to interact with Figma designs directly from your development environment.

## Prerequisites

1. **Figma Desktop App** or **Figma Web** account
2. **Cursor IDE** with MCP support
3. **Node.js/Bun** installed (for running the MCP server)

## Setup Steps

### Step 1: Configure MCP Server in Cursor

Add the following configuration to your Cursor MCP settings:

**Location:** Cursor Settings → MCP Servers (or `.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "bunx",
      "args": [
        "cursor-talk-to-figma-mcp@latest"
      ]
    }
  }
}
```

### Step 2: Install Figma Plugin

1. Open Figma Desktop App or Figma Web
2. Go to **Plugins** → **Browse all plugins**
3. Search for **"Talk to Figma"** or **"Cursor Figma MCP"**
4. Install and enable the plugin

### Step 3: Connect Figma to Cursor

1. In Figma, open the plugin: **Plugins** → **Talk to Figma**
2. The plugin will provide a connection token or channel name
3. Make sure the plugin is running before using MCP commands

### Step 4: Verify Connection

Test the connection by:
1. Opening a Figma file
2. Selecting an element in Figma
3. Using the MCP commands in Cursor

## Available MCP Commands

Once connected, you can use these commands in Cursor:

### Document Operations
- `get_document_info` - Get information about the current Figma document
- `get_selection` - Get information about selected elements
- `read_my_design` - Get detailed information about selected design

### Node Operations
- `get_node_info` - Get information about a specific node
- `get_nodes_info` - Get information about multiple nodes
- `create_rectangle` - Create a new rectangle
- `create_frame` - Create a new frame
- `create_text` - Create a new text element

### Modifications
- `set_fill_color` - Change fill color
- `set_stroke_color` - Change stroke color
- `move_node` - Move a node
- `resize_node` - Resize a node
- `delete_node` - Delete a node

### Layout & Styles
- `set_layout_mode` - Set auto-layout mode
- `set_padding` - Set padding values
- `set_axis_align` - Set alignment
- `set_corner_radius` - Set corner radius

### Components
- `get_local_components` - Get all local components
- `create_component_instance` - Create component instance
- `set_instance_overrides` - Apply overrides

### Text Operations
- `set_text_content` - Change text content
- `scan_text_nodes` - Scan all text nodes

### Export
- `export_node_as_image` - Export node as image (PNG, JPG, SVG, PDF)

## Usage Examples

### Example 1: Get Design Information
```
@Figma get_document_info
```

### Example 2: Read Selected Design
```
@Figma read_my_design
```

### Example 3: Create a Rectangle
```
@Figma create_rectangle x=100 y=100 width=200 height=150
```

### Example 4: Export Selected Element
```
@Figma export_node_as_image format=PNG scale=2
```

## Troubleshooting

### Connection Timeout
- **Issue:** "Request to Figma timed out"
- **Solution:** 
  1. Make sure Figma plugin is running
  2. Check that you've joined a channel: `join_channel default`
  3. Verify Figma is open and file is accessible

### Plugin Not Found
- **Issue:** Can't find the plugin in Figma
- **Solution:**
  1. Search for "Talk to Figma MCP" in plugin marketplace
  2. Install from: https://figma.com/community/plugins/[plugin-name]
  3. Check plugin permissions

### MCP Server Not Starting
- **Issue:** MCP server fails to start
- **Solution:**
  1. Verify `bunx` is installed: `npm install -g bunx` or use `npx`
  2. Try alternative command: `npx cursor-talk-to-figma-mcp@latest`
  3. Check Cursor logs for errors

### Channel Connection Issues
- **Issue:** Cannot join channel
- **Solution:**
  1. Use default channel first: `join_channel default`
  2. Check plugin is active in Figma
  3. Restart both Cursor and Figma plugin

## Best Practices

1. **Always join a channel** before using Figma commands
2. **Keep Figma plugin active** while working
3. **Select elements** in Figma before reading design info
4. **Use specific node IDs** for programmatic operations
5. **Export assets** at appropriate scales (1x, 2x, 3x)

## Integration with Development Workflow

### Design-to-Code Workflow
1. Designer creates designs in Figma
2. Developer opens Figma file
3. Developer selects component in Figma
4. Developer uses `read_my_design` to get specs
5. Developer implements component in React/TypeScript
6. Developer can export assets directly from Figma

### Component Sync
1. Export design tokens (colors, spacing) from Figma
2. Import into Tailwind config or CSS variables
3. Use exported assets in components
4. Keep design system in sync

## Resources

- **Figma Plugin:** [Talk to Figma MCP](https://figma.com/community)
- **Cursor MCP Docs:** [Cursor MCP Documentation](https://cursor.sh/docs/mcp)
- **Figma API:** [Figma Plugin API](https://www.figma.com/plugin-docs/)

## Support

If you encounter issues:
1. Check Cursor MCP logs
2. Check Figma plugin console
3. Verify network connectivity
4. Ensure both tools are up to date

---

**Last Updated:** January 2025
**Status:** Configuration Ready - Needs Figma Plugin Setup

