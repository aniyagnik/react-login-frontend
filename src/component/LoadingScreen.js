import React from "react";
import ReactLoading from "react-loading";

function  LoadingScreen() {
    return(
        <div className="loadingScreen">
            <ReactLoading type="spokes" color="white"
        height={150} width={150} />
        </div>
    )
}

export default LoadingScreen