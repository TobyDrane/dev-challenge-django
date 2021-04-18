export type InterestState = {
    initialDeposit: number
    interest: number
    monthlyDeposit: number
    duration: number
    totalInvestment: number
}

export type AppState = {
    interestState?: InterestState
    chart?: {
        xAxis: number[] | string[]
        yAxis: number[]
    }
}
