import React, { Suspense } from "react";
const Imagen = React.lazy(()=> import("./Image"))

const LazyLoadingImage = ({url, description}) => {
    return (
        <Suspense fallback={<h5>...Loading</h5>}>
            <Imagen url={url} description={description}/>
        </Suspense>
        )
}
export default LazyLoadingImage;
