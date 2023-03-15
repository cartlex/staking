export const getSlicedAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(38)}`
}