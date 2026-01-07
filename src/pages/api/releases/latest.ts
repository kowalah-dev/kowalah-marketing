import type { APIRoute } from 'astro';
import { list } from '@vercel/blob';

/**
 * API endpoint to fetch the latest Kowalah Reserved release from Vercel Blob Storage
 *
 * This endpoint:
 * 1. Lists all files in the releases directory
 * 2. Parses version numbers from directory names
 * 3. Returns the latest version with download URLs
 *
 * Response format:
 * {
 *   version: "1.0.4",
 *   releaseDate: "2025-01-06T...",
 *   assets: {
 *     macOS: {
 *       arm64: {
 *         url: "https://...",
 *         size: 194560000,
 *         filename: "Kowalah-Reserved-arm64.dmg"
 *       }
 *     }
 *   }
 * }
 */

export const GET: APIRoute = async () => {
  try {
    // List all files in the releases directory
    // The prefix filters to only files in the releases/ folder
    const { blobs } = await list({
      prefix: 'releases/',
      token: import.meta.env.BLOB_READ_WRITE_TOKEN
    });

    if (!blobs || blobs.length === 0) {
      return new Response(JSON.stringify({
        error: 'No releases found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse version numbers from filenames like "Kowalah-Reserved-1.0.4-arm64.dmg"
    const releases = blobs
      .filter(blob => {
        // Filter for .dmg files with version pattern in filename
        return blob.pathname.includes('releases/latest/') &&
               blob.pathname.endsWith('.dmg') &&
               /Kowalah-Reserved-\d+\.\d+\.\d+-arm64\.dmg/.test(blob.pathname);
      })
      .map(blob => {
        const filename = blob.pathname.split('/').pop() || ''; // e.g., "Kowalah-Reserved-1.0.4-arm64.dmg"

        // Extract version from filename using regex
        const versionMatch = filename.match(/Kowalah-Reserved-(\d+\.\d+\.\d+)-arm64\.dmg/);
        const version = versionMatch ? versionMatch[1] : '0.0.0';

        // Parse version for sorting
        const [major, minor, patch] = version.split('.').map(Number);

        return {
          version,
          versionNumber: major * 10000 + minor * 100 + patch, // For sorting
          filename,
          url: blob.url,
          size: blob.size,
          uploadedAt: blob.uploadedAt
        };
      });

    if (releases.length === 0) {
      return new Response(JSON.stringify({
        error: 'No valid releases found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sort by version number (descending) to get the latest
    releases.sort((a, b) => b.versionNumber - a.versionNumber);
    const latestRelease = releases[0];

    // Format size in human-readable format
    const formatSize = (bytes: number): string => {
      const mb = bytes / (1024 * 1024);
      return `~${Math.round(mb)} MB`;
    };

    // Format the response
    const response = {
      version: latestRelease.version,
      releaseDate: new Date(latestRelease.uploadedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      }),
      assets: {
        macOS: {
          arm64: {
            label: "Apple Silicon (M1/M2/M3/M4)",
            filename: latestRelease.filename,
            url: latestRelease.url,
            size: formatSize(latestRelease.size),
            available: true
          },
          intel: {
            label: "Intel",
            filename: null,
            url: null,
            size: null,
            available: false,
            comingSoon: false
          }
        },
        windows: {
          x64: {
            label: "Windows (64-bit)",
            filename: null,
            url: null,
            size: null,
            available: false,
            comingSoon: true
          }
        }
      }
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Error fetching latest release:', error);

    return new Response(JSON.stringify({
      error: 'Failed to fetch latest release',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
