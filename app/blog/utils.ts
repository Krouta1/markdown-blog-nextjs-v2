import fs from "fs";
import path from "path";
import matter from "gray-matter";

type MDXMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category: string;
};

// function to get the MD and MDX files from the blog folder
function getMDXFiles(dir: string) {
  const files = fs.readdirSync(dir);
  return files.filter(
    (file) => path.extname(file) === ".mdx" || path.extname(file) === ".md"
  );
}

// read data from those files
function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf8");
  return matter(rawContent);
}

// Read all the data from the MDX files

function getMDXdata(dir: string) {
  const files = getMDXFiles(dir);
  const allPosts = files.map((file) => {
    const filePath = path.join(dir, file);
    const { data: metadata, content } = readMDXFile(filePath);
    const slug = path.basename(file, path.extname(file));
    return {
      metadata: metadata as MDXMetadata,
      slug,
      content,
    };
  });
  return allPosts;
}

export function getBlogPosts() {
  return getMDXdata(path.join(process.cwd(), "app", "blog", "contents"));
}

// format published date
export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
