import React from 'react';

const Layout = (props: { children: React.ReactNode; }) => {
    return (
        // header
        <main>
                {props.children}
        </main>
    )
}

export default Layout