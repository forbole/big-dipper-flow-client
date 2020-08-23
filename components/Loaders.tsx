import React from 'react'
import ContentLoader from 'react-content-loader'

export const TableLoader = () => {
    const random = Math.random() * (1 - 0.7) + 0.7
    return (
        <ContentLoader
        viewBox="0 0 1060 40"
        height={40}
        width={1060}
        speed={2}
        >
        <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
        <rect x="34" y="13" rx="6" ry="6" width={200 * random} height="12" />
        <rect x="633" y="13" rx="6" ry="6" width={23 * random} height="12" />
        <rect x="653" y="13" rx="6" ry="6" width={78 * random} height="12" />
        <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
        <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />

        <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
        </ContentLoader>
    )
}