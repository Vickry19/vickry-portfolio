import {
    handleUpload,
    type HandleUploadBody,
} from "@vercel/blob/client";
import {
    NextRequest,
    NextResponse,
} from "next/server";

const ALLOWED_ORIGIN =
    "https://vickry-portfolio-api.vercel.app";

const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
];

const ALL_EXTENSIONS = [
    ...IMAGE_EXTENSIONS,
    ".pdf",
];

const IMAGE_CONTENT_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const PDF_CONTENT_TYPES = [
    "application/pdf",
];

/**
 * CORS preflight.
 */
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

/**
 * Vercel Blob upload handler.
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse> {
    try {
        /*
        |--------------------------------------------------------------------------
        | Validate Origin
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | Parse Request
        |--------------------------------------------------------------------------
        */

        const body =
            (await request.json()) as HandleUploadBody;

        /*
        |--------------------------------------------------------------------------
        | Handle Vercel Blob Upload
        |--------------------------------------------------------------------------
        */

        const jsonResponse = await handleUpload({
            body,
            request,

            /*
            |--------------------------------------------------------------------------
            | Generate Upload Token
            |--------------------------------------------------------------------------
            */

            onBeforeGenerateToken: async (
                pathname,
                clientPayload
            ) => {
                const extension =
                    pathname
                        .substring(
                            pathname.lastIndexOf(".")
                        )
                        .toLowerCase();

                /*
                |--------------------------------------------------------------------------
                | Validate Extension
                |--------------------------------------------------------------------------
                */

                if (!ALL_EXTENSIONS.includes(extension)) {
                    throw new Error(
                        "Format file tidak diperbolehkan."
                    );
                }

                const isImage =
                    IMAGE_EXTENSIONS.includes(
                        extension
                    );

                const isPdf =
                    extension === ".pdf";

                /*
                |--------------------------------------------------------------------------
                | Profile Image
                |--------------------------------------------------------------------------
                |
                | Folder:
                | profile/
                |
                | Format:
                | JPG, JPEG, PNG, WEBP
                |
                | Maximum:
                | 5 MB
                |
                */

                if (
                    isImage &&
                    pathname.startsWith("profile/")
                ) {
                    return {
                        allowedContentTypes:
                            IMAGE_CONTENT_TYPES,

                        maximumSizeInBytes:
                            5 * 1024 * 1024,

                        addRandomSuffix: true,

                        tokenPayload:
                            JSON.stringify({
                                folder: "profile",
                                clientPayload:
                                    clientPayload ??
                                    null,
                            }),
                    };
                }

                /*
                |--------------------------------------------------------------------------
                | CV
                |--------------------------------------------------------------------------
                |
                | Folder:
                | cv/
                |
                | Format:
                | PDF
                |
                | Maximum:
                | 10 MB
                |
                */

                if (
                    isPdf &&
                    pathname.startsWith("cv/")
                ) {
                    return {
                        allowedContentTypes:
                            PDF_CONTENT_TYPES,

                        maximumSizeInBytes:
                            10 * 1024 * 1024,

                        addRandomSuffix: true,

                        tokenPayload:
                            JSON.stringify({
                                folder: "cv",
                                clientPayload:
                                    clientPayload ??
                                    null,
                            }),
                    };
                }

                /*
                |--------------------------------------------------------------------------
                | Project Images
                |--------------------------------------------------------------------------
                |
                | Folder:
                | projects/
                |
                | Format:
                | JPG, JPEG, PNG, WEBP
                |
                | Maximum:
                | 5 MB
                |
                */

                if (
                    isImage &&
                    pathname.startsWith("projects/")
                ) {
                    return {
                        allowedContentTypes:
                            IMAGE_CONTENT_TYPES,

                        maximumSizeInBytes:
                            5 * 1024 * 1024,

                        addRandomSuffix: true,

                        tokenPayload:
                            JSON.stringify({
                                folder: "projects",
                                clientPayload:
                                    clientPayload ??
                                    null,
                            }),
                    };
                }

                /*
                |--------------------------------------------------------------------------
                | Certificate Files
                |--------------------------------------------------------------------------
                |
                | Folder:
                | certificates/
                |
                | Format:
                | JPG, JPEG, PNG, WEBP, PDF
                |
                | Maximum:
                | 10 MB
                |
                */

                if (
                    pathname.startsWith(
                        "certificates/"
                    )
                ) {
                    return {
                        allowedContentTypes: [
                            ...IMAGE_CONTENT_TYPES,
                            ...PDF_CONTENT_TYPES,
                        ],

                        maximumSizeInBytes:
                            10 * 1024 * 1024,

                        addRandomSuffix: true,

                        tokenPayload:
                            JSON.stringify({
                                folder:
                                    "certificates",
                                clientPayload:
                                    clientPayload ??
                                    null,
                            }),
                    };
                }

                /*
                |--------------------------------------------------------------------------
                | Reject Unknown Folder
                |--------------------------------------------------------------------------
                */

                throw new Error(
                    "Folder atau tipe file tidak diperbolehkan."
                );
            },

            /*
            |--------------------------------------------------------------------------
            | Upload Completed
            |--------------------------------------------------------------------------
            */

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

        /*
        |--------------------------------------------------------------------------
        | Success Response
        |--------------------------------------------------------------------------
        */

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