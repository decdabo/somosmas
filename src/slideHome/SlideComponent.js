import React from 'react';

export const SlideComponent = ({ data }) => {
    return (
        <div style={{
            backgroundImage: `url(${data.image})`,
        }}
        className="slide__home"
        >
            <h1>{data.name}</h1>
        </div>
    );
}
