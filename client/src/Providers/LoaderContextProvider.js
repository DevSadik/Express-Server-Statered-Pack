import { useReducer } from "react";
import LoaderContext from "../Context/LoaderContext";
import { LoaderReducer } from "../Reducers/LoaderReducer";

const INITIAL_STATE = 100;

const LoaderContextProviders = ({children}) => {

    const [ loaderState , loaderDispatch ] = useReducer( LoaderReducer , INITIAL_STATE )

    return (
        <LoaderContext.Provider value={{
            loaderState,
            loaderDispatch
        }}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderContextProviders;