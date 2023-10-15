import React from "react"
import { Dog, Hook } from "../../utils/interfaces"
import Card from "../Card/Card"

const CandidateDog: React.FC<{ hook: Hook, dog: Dog, onRefresh: () => void }> = ({ hook, dog, onRefresh }) => {
    const handleRefreshClick = () => {
        onRefresh(); // Llama a la función de refresco proporcionada por el padre
    };

    return (
        <>
            {<Card dog={dog} hook={hook}></Card >}
        </>
    )
}

export default CandidateDog