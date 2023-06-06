

export const LoaderReducer = (state , {type , payload}) => {
    switch (type) {
        case 'LOADER_START':
            return payload;

            case 'LOADER_START':
                return 0;
    
        default:
            return state;
    }
}