const month = ["jan","feb","march","april","may","june","july","august","september","october","november","december"]
const day = ["sunday","monday","tuesday","wednesday","thuresday","friday","saturday"]

export const getDay = (timestamp) => {
    let date = new Date(timestamp)

    return `${date.getDate()} ${month[date.getMonth()]}`
}

export const getFullDay = (timestamp) => {

    let date = new Date(timestamp)

    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}