import React from "react";

export function Image({
    src,
    alt = "",
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {

    const defaultImage = "/storage/images/products/default.jpg";

    const getImageUrl = (image?: string | null) => {

        if (!image) {
            return defaultImage;
        }

        // External URL
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }

        // Remove leading slash
        image = image.replace(/^\/+/, "");

        // Remove storage/ if it already exists
        image = image.replace(/^storage\//, "");

        return `/storage/${image}`;
    };

    return (
        <img
            {...props}
            src={getImageUrl(src)}
            alt={alt}
            onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = defaultImage;
            }}
        />
    );
}