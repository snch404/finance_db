export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-transition h-full w-full">
      {children}
    </div>
  );
}
