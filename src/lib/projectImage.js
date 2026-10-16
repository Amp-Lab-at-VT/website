// Build-time helper shared by the projects page and the lab monitor:
// resolve a cover image for a project from its GitHub repo.

export async function resolveProjectImage(repoUrl, branch) {
  const cleaned = repoUrl
    .replace(/\.git$/, "")
    .replace(/#.*$/, "")
    .trim();
  const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const [, owner, repo] = match;
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;

  const headers = {
    "User-Agent": "AMP-Lab-Website",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Try hero.png and hero.jpg first (fast HEAD requests)
  for (const filename of ["hero.png", "hero.jpg", "hero.jpeg"]) {
    try {
      const res = await fetch(`${rawBase}/${filename}`, {
        method: "HEAD",
        headers,
      });

      if (res.ok) {
        console.log(`[images] ${owner}/${repo} → ${filename}`);
        return `${rawBase}/${filename}`;
      }
    } catch {
      // continue to next
    }
  }

  // 2. No hero image found — scan the repo root for any .png/.jpg/.jpeg
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
    const apiHeaders = {
      Accept: "application/vnd.github.v3+json",
      ...headers,
    };

    const res = await fetch(apiUrl, { headers: apiHeaders });

    if (res.ok) {
      const contents = await res.json();

      if (Array.isArray(contents)) {
        // Look for image files, prefer ones with keywords like
        // "cover", "banner", "thumbnail", "logo" in the name
        const imageFiles = contents.filter(
          (f) => f.type === "file" && /\.(png|jpg|jpeg)$/i.test(f.name),
        );

        if (imageFiles.length > 0) {
          // Prefer images with descriptive names over random ones
          const preferred = imageFiles.find((f) =>
            /cover|banner|thumb|logo|photo|image|pic/i.test(f.name),
          );

          const chosen = preferred || imageFiles[0];
          const imageUrl = `${rawBase}/${chosen.name}`;

          console.log(`[images] ${owner}/${repo} → fallback: ${chosen.name}`);

          return imageUrl;
        }
      }
    }
  } catch (err) {
    console.warn(`[images] Failed to scan repo ${owner}/${repo}:`, err.message);
  }

  // 3. Nothing found at all
  console.log(`[images] ${owner}/${repo} → no image found`);
  return null;
}
