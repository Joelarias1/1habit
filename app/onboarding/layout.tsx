
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">

      {/* Content */}
      <div className="relative flex min-h-screen">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 