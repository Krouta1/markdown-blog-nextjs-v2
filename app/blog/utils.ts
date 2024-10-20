import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
      metadata,
      slug,
      content,
    };
  });
  return allPosts;
}

export function getAllPosts() {
  return getMDXdata(path.join(process.cwd(), "app", "blog", "contents"));
}

// format published date
export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    return `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }

  const fullDate = targetDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  } else {
    return `${fullDate} (${formattedDate})`;
  }
}
