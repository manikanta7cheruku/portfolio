export default function ExternalLink({
  href,
  children,
  className = "link",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr">, opens in a new tab</span>
    </a>
  );
}
