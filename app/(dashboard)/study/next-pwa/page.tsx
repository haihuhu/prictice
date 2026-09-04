// app/notes/pwa/page.tsx
import { AlertTriangle, CheckCircle2, FileCode, Lightbulb } from 'lucide-react';
import { CodeWindow } from '@/components/CodeWindow';
export default function PWANotes() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold">PWA Notes (Next.js App Router)</h1>
        <p className="text-gray-600 mt-1">Turn a web app into an installable Progressive Web App</p>
      </header>

      {/* What is PWA */}
      <Section icon="info" title="What is a PWA?">
        <p className="text-gray-700 leading-relaxed">
          A Progressive Web App lets users install your website like a native app (home screen icon,
          standalone window, no browser bar). Three things make it work:
        </p>
        <ul className="mt-3 space-y-2">
          <Bullet>
            <strong>manifest.json</strong> — app metadata (name, icons, colors)
          </Bullet>
          <Bullet>
            <strong>Icons</strong> — multiple sizes + a maskable version
          </Bullet>
          <Bullet>
            <strong>Metadata API</strong> — how Next.js injects the config
          </Bullet>
        </ul>
      </Section>

      {/* Step 1: manifest */}
      <Section icon="file" title="1. public/manifest.json">
        <CodeWindow
          code={`{
  "name": "Your App Name",
  "short_name": "AppName",
  "description": "One sentence about your app",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}`}
        />
        <Note>
          Icon paths must match your folder. If icons live in{' '}
          <code className="bg-gray-100 px-1">public/icon/</code>, the path is{' '}
          <code className="bg-gray-100 px-1">/icon/...</code>
        </Note>
      </Section>

      {/* Step 2: Metadata API — the key lesson */}
      <Section icon="file" title="2. layout.tsx — Use Metadata API (NOT manual head)">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-4">
          <div className="flex gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900">
              <strong>Core lesson:</strong> In App Router, never hand-write{' '}
              <code className="bg-amber-100 px-1">&lt;head&gt;</code> tags. Use the{' '}
              <code className="bg-amber-100 px-1">metadata</code> and{' '}
              <code className="bg-amber-100 px-1">viewport</code> exports. Next.js injects them
              correctly and removes duplicate-tag warnings.
            </p>
          </div>
        </div>

        <CodeWindow
          code={`import type { Metadata, Viewport } from 'next';

// Metadata API: Next.js generates head tags from this
export const metadata: Metadata = {
  title: 'Your App',
  description: 'Description here',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Your App',
  },
  formatDetection: {
    telephone: false,
  },
  // Replaces manual <link rel="icon"> and apple-touch-icon
  icons: {
    icon: '/icon/favicon-32x32.png',
    apple: '/icon/icon-192.png',
  },
};

// viewport: theme color goes here in Next.js 14+
export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* No manual <head>. Next.js handles it. */}
      <body>{children}</body>
    </html>
  );
}`}
        />
      </Section>

      {/* Before vs After */}
      <Section icon="check" title="3. Wrong vs Right">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-red-200 rounded-lg overflow-hidden">
            <div className="bg-red-100 px-3 py-2 text-sm font-semibold text-red-900">
              ❌ Manual head (triggers warnings)
            </div>
            <pre className="bg-gray-900 text-gray-100 p-3 text-xs overflow-x-auto">
              <CodeWindow
                code={`<head>
  <meta name="theme-color" ... />
  <link rel="apple-touch-icon" ... />
  <link rel="icon" ... />
</head>`}
              />
            </pre>
          </div>
          <div className="border border-green-200 rounded-lg overflow-hidden">
            <div className="bg-green-100 px-3 py-2 text-sm font-semibold text-green-900">
              ✅ Metadata API (clean)
            </div>
            <pre className="bg-gray-900 text-gray-100 p-3 text-xs overflow-x-auto">
              <CodeWindow
                code={`export const metadata = {
  icons: { ... },
};
export const viewport = {
  themeColor: '#000000',
};`}
              />
            </pre>
          </div>
        </div>
      </Section>

      {/* Key fields */}
      <Section icon="info" title="4. Key Fields Explained">
        <div className="space-y-3">
          <Field name="display: standalone" desc="Hides browser UI, looks native" />
          <Field name="start_url" desc="Page opened when tapping the icon" />
          <Field name="theme_color" desc="Browser/status bar color" />
          <Field
            name='purpose: "maskable"'
            desc="Lets the OS crop the icon into shapes (circle, squircle). Needs a safe-area design."
          />
        </div>
      </Section>

      {/* Common warnings */}
      <Section icon="warning" title="5. Common Warnings (not real errors)">
        <WarningRow
          msg="theme-color not supported by Firefox"
          fix="Harmless. Moving it to viewport.themeColor is the correct Next.js way."
        />
        <WarningRow
          msg="apple-touch-icon should be in <head>"
          fix="Means you wrote it manually. Move to metadata.icons.apple to fix."
        />
      </Section>

      {/* Icon tools */}
      <Section icon="info" title="6. Generate Icons (free)">
        <ToolRow
          name="PWA Asset Generator"
          url="https://www.pwa-asset-generator.com/"
          desc="Upload one logo, get all sizes"
        />
        <ToolRow
          name="Maskable.app"
          url="https://maskable.app/"
          desc="Design and preview maskable icons"
        />
      </Section>

      {/* Test checklist */}
      <Section icon="check" title="7. Test Checklist">
        <ul className="space-y-2">
          <Bullet>DevTools → Application → Manifest loads with no errors</Bullet>
          <Bullet>Desktop Chrome: install icon appears in address bar</Bullet>
          <Bullet>Mobile: Add to Home Screen works</Bullet>
          <Bullet>Lighthouse → PWA audit passes</Bullet>
        </ul>
      </Section>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Section({
  icon,
  title,
  children,
}: {
  icon: 'info' | 'file' | 'warning' | 'check';
  title: string;
  children: React.ReactNode;
}) {
  const icons = {
    info: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    file: <FileCode className="w-5 h-5 text-purple-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    check: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  };
  return (
    <section>
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        {icons[icon]}
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-gray-700">
      <span className="text-green-600 flex-shrink-0">✓</span>
      <span>{children}</span>
    </li>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 p-3 rounded">
      💡 {children}
    </p>
  );
}

function Field({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
      <code className="font-semibold text-blue-900">{name}</code>
      <p className="text-sm text-blue-800 mt-1">{desc}</p>
    </div>
  );
}

function WarningRow({ msg, fix }: { msg: string; fix: string }) {
  return (
    <div className="border-l-4 border-amber-400 bg-amber-50 p-3 rounded mb-3">
      <p className="text-sm font-semibold text-amber-900">⚠️ {msg}</p>
      <p className="text-sm text-amber-800 mt-1">{fix}</p>
    </div>
  );
}

function ToolRow({ name, url, desc }: { name: string; url: string; desc: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-3 rounded mb-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-600 hover:underline"
      >
        {name} ↗
      </a>
      <p className="text-sm text-gray-700 mt-1">{desc}</p>
    </div>
  );
}
