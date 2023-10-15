import React from "react"
import { Dog, Hook } from "../../utils/interfaces"
import Card from "../Card/Card"


const DogList: React.FC<{ hook: Hook, list: Dog[] }> = ({ hook, list }) => {
    return (
        <>
            {list?.map((item, index) =>
                <Card hook={hook} key={index} dog={item} ></Card >
            )}

        </>
    )
}

export default DogList