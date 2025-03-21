import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

export const dynamic = 'force-dynamic';

// Define interfaces for Cloudinary resources
interface CloudinaryResource {
  secure_url: string;
  tags?: string[];
}

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Normalizes a character name for use in Cloudinary tags
 * Handles special name formats with spaces and hyphens
 */
function normalizeTagName(characterName: string): string {
  // Handle special cases with "Bhagawan" suffix
  if (characterName.includes(' Bhagawan')) {
    return characterName.replace(' ', '-');
  }
  
  // Return the character name without any transformations for regular names
  return characterName;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const characterName = url.searchParams.get('name');

    if (!characterName) {
      return NextResponse.json({ error: 'Character name is required' }, { status: 400 });
    }

    const folderPath = 'mahabharatha'; // Cloudinary folder
    const normalizedTag = normalizeTagName(characterName);

    // Search for images with the exact tag match in the specified folder
    const result = await cloudinary.v2.search
      .expression(`folder:${folderPath} AND tags=${normalizedTag}`)
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute();

    if (result.resources.length > 0) {
      return NextResponse.json({ imageUrl: result.resources[0].secure_url });
    }

    // If no results found, try a case-insensitive search
    const fallbackResult = await cloudinary.v2.search
      .expression(`folder:${folderPath}`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    
    // Manually filter for a case-insensitive tag match
    const matchedResource = fallbackResult.resources.find((resource: CloudinaryResource) => {
      if (!resource.tags) return false;
      return resource.tags.some((tag: string) => 
        tag.toLowerCase() === normalizedTag.toLowerCase()
      );
    });

    if (matchedResource) {
      return NextResponse.json({ imageUrl: matchedResource.secure_url });
    }

    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}