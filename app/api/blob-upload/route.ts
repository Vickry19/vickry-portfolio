import {
    handleUpload,
    type HandleUploadBody,
  } from "@vercel/blob/client";
  import { NextRequest, NextResponse } from "next/server";
  
  const ALLOWED_ORIGIN = "https://vickry-portfolio-api.vercel.app";
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  
  export async function OPTIONS() {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  export async function POST(
    request: NextRequest
  ): Promise<NextResponse> {
    try {
      const origin = request.headers.get("origin");
  
      if (origin !== ALLOWED_ORIGIN) {
        return NextResponse.json(
          {
            success: false,
            message: "Origin tidak diizinkan.",
          },
          {
            status: 403,
            headers: corsHeaders,
          }
        );
      }
  
      const body = (await request.json()) as HandleUploadBody;
  
      const jsonResponse = await handleUpload({
        body,
        request,
  
        onBeforeGenerateToken: async (
          pathname,
          clientPayload
        ) => {
          const extension =
            pathname
              .substring(pathname.lastIndexOf("."))
              .toLowerCase();
  
          const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
            ".pdf",
          ];
  
          if (!allowedExtensions.includes(extension)) {
            throw new Error(
              "Format file tidak diperbolehkan."
            );
          }
  
          const isImage = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
          ].includes(extension);
  
          const isPdf = extension === ".pdf";
  
          if (isImage && pathname.startsWith("profile/")) {
            return {
              allowedContentTypes: [
                "image/jpeg",
                "image/png",
                "image/webp",
              ],
              maximumSizeInBytes: 5 * 1024 * 1024,
              addRandomSuffix: true,
              tokenPayload: JSON.stringify({
                folder: "profile",
                clientPayload: clientPayload ?? null,
              }),
            };
          }
  
          if (isPdf && pathname.startsWith("cv/")) {
            return {
              allowedContentTypes: [
                "application/pdf",
              ],
              maximumSizeInBytes: 10 * 1024 * 1024,
              addRandomSuffix: true,
              tokenPayload: JSON.stringify({
                folder: "cv",
                clientPayload: clientPayload ?? null,
              }),
            };
          }
  
          throw new Error(
            "Folder atau tipe file tidak diperbolehkan."
          );
        },
  
        onUploadCompleted: async ({
          blob,
          tokenPayload,
        }) => {
          console.log(
            "Vercel Blob upload completed:",
            blob.url,
            tokenPayload
          );
        },
      });
  
      return NextResponse.json(
        jsonResponse,
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    } catch (error) {
      console.error(
        "Vercel Blob upload error:",
        error
      );
  
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Upload gagal.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }
  }