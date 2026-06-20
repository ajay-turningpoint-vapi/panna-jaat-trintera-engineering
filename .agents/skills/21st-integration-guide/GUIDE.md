# Using 21st.dev Components in Trinetra Engineering Website

This guide explains how to discover, install, and use components from 21st.dev to enhance your website.

## Quick Start

### 1. Using the 21st.dev Magic MCP

We've configured the **21st.dev Magic Model Context Protocol** in `.vscode/mcp.json`. This gives you access to 21st.dev component generation and management directly in VS Code.

**API Key:** Already configured in your VS Code settings (prompts on first use)

### 2. Available Installation Methods

#### Method A: Install from Public Registry (Recommended for UI Components)

```bash
# Install button component
npx @21st-dev/registry add @21st-dev/button

# Install card component
npx @21st-dev/registry add @21st-dev/card

# Install badge component
npx @21st-dev/registry add @21st-dev/badge
```

#### Method B: Using shadcn CLI

```bash
# Some 21st.dev components work with shadcn
npx shadcn-ui@latest add "https://21st.dev/r/your-username/component-name"
```

## Popular 21st.dev Components for Your Use Case

### For Manufacturing/B2B Websites

| Component            | Purpose                                                     | Installation                                           |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| **Animated Button**  | Call-to-action with hover effects                           | `npx @21st-dev/registry add @21st-dev/animated-button` |
| **Card**             | Display products/services                                   | `npx @21st-dev/registry add @21st-dev/card`            |
| **Badge**            | Highlight features/stats                                    | `npx @21st-dev/registry add @21st-dev/badge`           |
| **Gradient Text**    | Eye-catching headlines                                      | `npx @21st-dev/registry add @21st-dev/gradient-text`   |
| **Scroll Animation** | Entrance effects                                            | `npx @21st-dev/registry add @21st-dev/scroll-animate`  |
| **Wave Effect**      | Background dividers ✅ (Already included as `DynamicWaves`) | -                                                      |

## Using Components in Your Code

### Example 1: Using DynamicWaves (Already Integrated)

Located in `src/components/ui/DynamicWaves.jsx`

```jsx
import DynamicWaves from "@/components/ui/DynamicWaves";

// In your component:
<DynamicWaves
  height={120}
  color="#3b82f6"
  opacity={0.5}
  amplitude={30}
  speed={0.04}
  waveCount={3}
/>;
```

### Example 2: After Installing a Component

```jsx
// Import
import { Button } from "@/components/ui/button"; // after installing

// Use in JSX
export function MyComponent() {
  return (
    <Button
      className="rounded-full bg-accent-blue"
      onClick={() => console.log("clicked")}
    >
      Browse Products
    </Button>
  );
}
```

## Where Components Go

After installation, components are automatically placed in:

- `src/components/ui/{component-name}.jsx`

## Integration with Current Website Structure

### Good places to add 21st.dev components:

1. **Hero Section** (`src/pages/Home.jsx` - `Hero()`)
   - Animated Buttons for CTAs
   - Gradient Text for headlines

2. **Services Section** (`src/pages/Home.jsx` - `Services()`)
   - Cards for service descriptions
   - Badges for feature highlights

3. **Products Section** (`src/pages/Home.jsx` - `Products()`)
   - Animated Cards
   - Scroll animations on entry

4. **Contact Section** (`src/pages/Home.jsx` - `Contact()`)
   - Enhanced form inputs
   - Animated submit button

## Step-by-Step: Add a New Component

### Step 1: Search for Available Components

```bash
# (Requires API key setup)
npx @21st-dev/registry search "button" --scope public
```

### Step 2: Install the Component

```bash
npx @21st-dev/registry add @21st-dev/animated-button
```

### Step 3: Update Your Import

```jsx
// In your Home.jsx or component file:
import AnimatedButton from "@/components/ui/animated-button";
```

### Step 4: Use in Your JSX

```jsx
<AnimatedButton href="#products" className="bg-accent-blue">
  Browse Products
</AnimatedButton>
```

## Current Implementation

### ✅ Already Integrated

- `DynamicWaves` - Wave divider between Hero and TrustBar sections
  - Location: `src/components/ui/DynamicWaves.jsx`
  - Used in: `src/pages/Home.jsx` (WaveDivider component)

### Next Steps to Consider

1. **Animated Buttons** - Replace current buttons with more interactive versions
2. **Card Components** - Enhance services and products display
3. **Scroll Animations** - Add parallax and entrance effects
4. **Gradient Text** - Make headlines more visually striking
5. **Badges** - Highlight key features and certifications

## Troubleshooting

### Component doesn't install?

- Check your internet connection
- Ensure you have the latest Node.js installed
- Try installing an older version: `npm i @21st-dev/registry@latest`

### Import errors after installation?

- Verify the file path matches where npm installed it
- Usually: `src/components/ui/{component-name}.jsx`
- Use the exact import shown in the installation output

### Styling issues?

- Most 21st.dev components use Tailwind CSS
- Ensure your tailwind.config.js includes the necessary setup
- Check component documentation for required props

## Resources

- **21st.dev Homepage**: https://21st.dev
- **Registry Search**: Use the MCP chat to generate components
- **Community**: Share your implementations to the 21st.dev team library

---

**Ready to add more components? Try using the Magic MCP or run the install commands above!**
