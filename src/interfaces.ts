export interface IPeople {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    id: number
}
export interface IHeadPeopleCell {
    id: keyof IPeople;
    label: string;
    numeric: boolean;
}