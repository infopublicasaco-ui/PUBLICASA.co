type IconProps = { className?: string };

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-blue">
      {children}
    </span>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.6V3.7C15.9 3.6 15 3.5 14 3.5c-2.4 0-4 1.4-4 4.1v2.3H7.3v3.1H10v8h3.5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V20H10s0-10.6 0-11.6h3.3v1.6c.4-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.5V20Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3.5c2.5 0 2.8 0 3.7.1 1 0 1.6.2 2 .4a3.9 3.9 0 0 1 2.3 2.3c.2.4.3 1 .4 2 0 .9.1 1.2.1 3.7s0 2.8-.1 3.7c0 1-.2 1.6-.4 2a3.9 3.9 0 0 1-2.3 2.3c-.4.2-1 .3-2 .4-.9 0-1.2.1-3.7.1s-2.8 0-3.7-.1c-1 0-1.6-.2-2-.4a3.9 3.9 0 0 1-2.3-2.3c-.2-.4-.3-1-.4-2 0-.9-.1-1.2-.1-3.7s0-2.8.1-3.7c0-1 .2-1.6.4-2a3.9 3.9 0 0 1 2.3-2.3c.4-.2 1-.3 2-.4.9-.1 1.2-.1 3.7-.1Zm0 4.2a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm0 7.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm4.5-7.3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

export function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      <IconBadge>
        <WhatsAppIcon className="h-4 w-4" />
      </IconBadge>
      <IconBadge>
        <YoutubeIcon className="h-4 w-4" />
      </IconBadge>
      <IconBadge>
        <FacebookIcon className="h-4 w-4" />
      </IconBadge>
      <IconBadge>
        <LinkedInIcon className="h-4 w-4" />
      </IconBadge>
      <IconBadge>
        <InstagramIcon className="h-4 w-4" />
      </IconBadge>
    </div>
  );
}
