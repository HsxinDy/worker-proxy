export default {
  async fetch(request) {
    const url = new URL(request.url);
    const fileId = url.searchParams.get("id");

    if (!fileId) {
      return new Response("Missing 'id' parameter", { status: 400 });
    }

    const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    const response = await fetch(driveUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};
