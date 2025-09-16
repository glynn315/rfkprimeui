export interface DashboardModel {
    dailySales: number,
    itemRelease: number,
    monthlySales: number,
    totalIncome: number,
    yearlySales: number,
    totalCustomers: number,
    salesGraph: { date: string; sales: number }[];
}
