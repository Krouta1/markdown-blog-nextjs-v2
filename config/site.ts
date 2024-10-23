type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Krouta Blog",
  description:
    "An Open source Technical Blog platform with Next.js 14 with shadcn/ui, prisma and markdown support.",
  url: "https://markdown-blog-nextjs-v2.vercel.app",
  ogImage: "https://markdown-blog-nextjs-v2.vercel.app/og",
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/krouta1",
  },
};
