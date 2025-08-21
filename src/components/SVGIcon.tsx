"use client";
import Image from 'next/image';

interface SVGIconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
    alt?: string;
}

export default function SVGIcon({ 
    name, 
    size = 24, 
    color,
    className = '',
    alt = ''
}: SVGIconProps) {
    const iconPath = `/icon-svg/${name}.svg`;
    
    return (
        <Image
            src={iconPath}
            width={size}
            height={size}
            alt={alt || name}
            className={className}
            style={{ 
                filter: color ? `brightness(0) saturate(100%) ${getColorFilter(color)}` : undefined,
                width: size,
                height: size
            }}
        />
    );
}

// Helper function to convert hex color to CSS filter
function getColorFilter(color: string): string {
    // For white color
    if (color === '#fff' || color === '#ffffff' || color === 'white') {
        return 'invert(100%)';
    }
    // For other colors, you can extend this function
    // This is a simplified version
    return '';
}