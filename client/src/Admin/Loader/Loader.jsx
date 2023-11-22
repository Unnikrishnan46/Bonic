import React from 'react'
import "./Loader.css";

function Loader({content}) {

    return (
        <>
            <div class="spinnerContainer">
                <div class="spinner"></div>
                <div class="loader">
                    <p>{content}</p>
                    <div class="words">
                        <span class="word">product</span>
                        <span class="word">images</span>
                        <span class="word">data</span>
                        <span class="word">hashtags</span>
                        <span class="word">posts</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader
