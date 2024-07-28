import { NextResponse } from "next/server";

export async function POST(req) {
  const { image, filename } = await req.json(); // Expecting base64 string and filename

  const token = process.env.GITHUB_TOKEN; // Your GitHub personal access token
  const repo = "pudhi99/truck-mate"; // Replace with your GitHub username and repository name
  const url = `https://api.github.com/repos/${repo}/contents/${filename}`;

  try {
    // Step 1: Check if the file already exists
    const existingFileResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    });

    let sha = null;
    if (existingFileResponse.ok) {
      const existingFileData = await existingFileResponse.json();
      sha = existingFileData.sha; // Get the SHA of the existing file
    }

    // Step 2: Upload the new image
    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload ${filename}`,
        content: image, // Base64 encoded image
        sha: sha, // Include the SHA if the file exists
      }),
    });

    if (!uploadResponse.ok) {
      throw new Error(`GitHub API error: ${uploadResponse.statusText}`);
    }

    const data = await uploadResponse.json();
    return NextResponse.json({ url: data.content.download_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
